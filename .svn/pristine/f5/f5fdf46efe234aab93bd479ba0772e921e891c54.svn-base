/**
 * Created by GLGGAG on 2017/3/16.
 * 导入好友
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
var timImpSend=function () {
  var self=this;
  self.sendFailTryAgainCount=0;
  self.beginSend = function (body) {
    api.request("sns", "friend_import", body, function (err, data) {
      if (err) {
        logger.info("timResponseMessageError:%s", err);
      }
      self.sendFailTryAgainCount++;
      logger.info("导入好友响应消息=====SuccessStatus:%s,ErrorCode:%s,ErrorInfo:%s,count:%s", data.ActionStatus, data.ErrorCode, data.ErrorInfo,self.sendFailTryAgainCount);
      if (data.ActionStatus != "OK" && data.ErrorCode != 0 && self.sendFailTryAgainCount < 3) {
        self.beginSend(body);
      }
    })
  };
};
var send=function(body){
  var ImpSend=new timImpSend();
  ImpSend.beginSend(body);
};
exports.send=send;




