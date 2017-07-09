/**
 * Created by GLGGAG on 2017/3/16.
 * https://www.npmjs.com/package/stomp-client
 */
var log4js = require("../../config/log.js");
var logger = log4js.logger;
var Stomp = require('stomp-client');
var config=require('../../config/activeMQConfig');
var masterPro=require('child_process');

/**
 * 当stomp-client接受的数据包时，因为nodejs是单线程执行，作为转发数据包需要大量计算，当数据包发生错误时
 * 如，json转化异常，那么会被domain异常捕获到并输出到日记。stomp-client就会阻塞在接受消息处无法及时回响
 * activeMQ，使的actvieMQ无法收到回响时在队列中维护的包体就不会被删除，当在有新的包体收到时，因为队列维护的是
 * FIFO，因此stomp-client会多次去队列中获取重复的多次的包。
 *
 *故在此，使用主线程监听activeMQ消息，将消息指定给子进程处理，主线程负责及时回响activeMQ，让队列中的包能够及时清掉
 */
var dir=__dirname;
var workerDir=__dirname.replace("server","child_process");
var workerPro= masterPro.fork(workerDir+'/timServerWorker.js');
workerPro.on("error",function (err) {
  logger.info("子进程启动失败:%s",err.message);
});
workerPro.on("disconnect",function (err) {
  logger.info("子进程IPC通关关闭:%s",err.message);
});
workerPro.on("exit",function (data) {
  logger.info("子进程已退出：%s",data);
});
/**
 * 监听的队列
 * @type {string}
 */
/**
 * 消息发送队列
 * @type {string}
 */
var messageSendQueue = '/queue/timSendMessage';

/**
 * 导入用户
 * @type {string}
 */
var inputAccountQueue='/queue/timRelationManage';

/**
 * 添加好友
 * @type {string}
 */
var addFriendsQueue='/queue/timAddFriends';
/**
 * 删除好友
 * @type {string}
 */
var delFriendsQueue='/queue/timDelFriends';

/**
 * 导入好友
 * @type {string}
 */
//var impFriendsQueue='/queue/timImpFriends';


var client = new Stomp(config);
client.disconnect(function (err) {
  console.log("ActiveMqConnetionError======%s,currentModule====%s",err,__filename);
});
/**
 * MQ信息发送过来是直接转发至TIM端，消息体已在MQ发送方组装完毕
 */
client.connect(function(sessionId) {
  client.subscribe(messageSendQueue, function(body, headers) {
   // logger.info("messageSendQueue=====:%s",body);
    var initBody=[];
    initBody.push(body);
    initBody.push(messageSendQueue);
    workerPro.send(initBody);
  });
  client.subscribe(inputAccountQueue, function(body, headers) {
   // logger.info("inputAccountQueue=====:%s",body);
    var initBody=[];
    initBody.push(body);
    initBody.push(inputAccountQueue);
    workerPro.send(initBody);
  });

  client.subscribe(addFriendsQueue, function(body, headers) {
   // logger.info("addFriendsQueue=====:%s",body);
    var initBody=[];
    initBody.push(body);
    initBody.push(addFriendsQueue);
    workerPro.send(initBody);
  });

  client.subscribe(delFriendsQueue, function(body, headers) {
    //logger.info("delFriendsQueue=====:%s",body);
    var initBody=[];
    initBody.push(body);
    initBody.push(delFriendsQueue);
    workerPro.send(initBody);
  });
  /*client.subscribe(impFriendsQueue, function(body, headers) {
    //logger.info("impFriendsQueue=====:%s",body);
    var initBody=[];
    initBody.push(body);
    initBody.push(impFriendsQueue);
    workerPro.send(initBody);
  });*/

  //client.publish(destination, 'Hello World!');
});
