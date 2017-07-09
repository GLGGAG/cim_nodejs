/**
 * Created by GLGGAG on 2017/3/16.
 * 消息发送服务
 */

var api=require('./timServerInit');
var log4js = require("../../config/log.js");
var logger = log4js.logger;
var addFriend=require('./timAddFriendsServer');
var initAddFriBody=require('../../config/timAddFriConfig');
var msgSendBoby=require('../../config/timMesConfig');

/**
 * 当发送失败时重试三次
 * @type {number}
 */
var timMesSend=function () {
  var self=this;
  self.sendFailTryAgainCount=0;
  self.beginSend = function (body) {
    api.request("openim", "sendmsg", body, function (err, data) {
      if (err) {
        logger.info("timResponseMessageError:%s", err);
      }
      self.sendFailTryAgainCount++;
      logger.info("消息发送响应消息=====SuccessStatus:%s,ErrorCode:%s,ErrorInfo:%s,count:%s", data.ActionStatus, data.ErrorCode, data.ErrorInfo,self.sendFailTryAgainCount);
      if (data.ActionStatus != "OK" && data.ErrorCode != 0 && self.sendFailTryAgainCount < 3) {
        self.beginSend(body);
      }
      /**
       * 发送消息失败，尝试添加好友后重新发送
       */
      if(self.sendFailTryAgainCount==3){
        var initAddFriBody=self.buildAddFriBody(body);
        addFriend.send(body);
      }
    })
  };
  /**
   * 从消息体内取出需要所需信息组装成添加好友初始消息体
   * @param body
   */
  self.buildAddFriBody=function (body) {
    var obBody=JSON.parse(body);
    var from_Account = obBody.From_Account;
    var to_Account = obBody.AddFriendItem[0].To_Account;
    initAddFriBody.From_Account = from_Account.toString();
    initAddFriBody.AddFriendItem[0].To_Account = to_Account.toString();
    return JSON.stringify(initAddFriBody);
  }

}

var send=function(body){
  var timSend=new timMesSend();
  timSend.beginSend(body);
}
exports.send=send;




