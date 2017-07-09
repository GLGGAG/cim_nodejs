/**
 * Created by GLGGAG on 2017/3/22.
 *
 *
 * 单一导入用户，用时间作为记录点
 */
var log4js = require("../../config/log.js");
var api=require('./timServerInit');
var logger = log4js.logger;
var initAddFriBody=require('../../config/timAddFriConfig');
var addFriSend=require('./timAddFriendsServer');

/**
 * 当发送失败时重试三次
 * @type {number}
 */

function singAccount() {
  var self=this;
  self.sendFailTryAgainCount = 0;
  self.beginSend = function (body,from_Account) {
    api.request("im_open_login_svc", "account_import", body, function (err, data) {
      if (err) {
        logger.info("timResponseMessageError:%s", err);
      }
      self.sendFailTryAgainCount++;
      logger.info("导入用户响应消息=====SuccessStatus:%s,ErrorCode:%s,ErrorInfo:%s,count:%s", data.ActionStatus, data.ErrorCode, data.ErrorInfo, self.sendFailTryAgainCount);
      if(data.ActionStatus!="OK"&& data.ErrorCode!=0&&self.sendFailTryAgainCount<3){
        self.beginSend(body,from_Account);
      }
      /* if((data.ActionStatus=="OK"&& data.ErrorCode==0)&&(from_Account!=''||from_Account!=undefined)){
       var addFriBody=self.buildAddFriBody(body,from_Account);
       new addFriSend().send(initAddFriBody);
       }*/

    })
  }
  self.buildAddFriBody=function (body,from_Account) {
    var to_Account = JSON.parse(body).Identifier;
    initAddFriBody.From_Account = from_Account.toString();
    initAddFriBody.AddFriendItem[0].To_Account = to_Account.toString();
    return JSON.stringify(initAddFriBody);
  }
}
var send = function (body,from_Account) {
    var sigAcc=new singAccount();
    sigAcc.beginSend(body,from_Account);
  }
exports.send=send;



