/**
 * Created by GLGGAG on 2017/3/16.
 * 添加好友
 * 当添加成功时调用发送消息服务发送自定义消息体
 */
var api=require('./timServerInit');
var log4js = require("../../config/log.js");
var logger = log4js.logger;

var delFriends=function () {
  var self=this;
  self.sendFailTryAgainCount = 0;
  self.beginSend = function (body) {
    api.request("sns", "friend_delete", body, function (err, data) {
      if (err) {
        logger.info("timResponseMessageError:%s", err);
      }
      self.sendFailTryAgainCount++;
      logger.info("删除好友响应消息======MessageSuccessStatus:%s,ErrorCode:%s,ErrorInfo:%s,count:%s", data.ActionStatus, data.ErrorCode, data.ErrorInfo, self.sendFailTryAgainCount);
      if (data.ActionStatus != "OK" && data.ErrorCode != 0 && self.sendFailTryAgainCount < 3) {
        self.beginSend(body);
      }
    })
  }

}

var send=function (body) {
  var del=new delFriends();
  del.beginSend(body)
}
exports.send=send;


