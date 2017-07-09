/**
 * Created by GLGGAG on 2017/3/22.
 *
 *
 * 批量导入用户，用时间作为记录点
 */
var log4js = require("../../config/log.js");
var api=require('./timServerInit');
var logger = log4js.logger;


/**
 * 当发送失败时重试三次
 * @type {number}
 */
function beaAccount() {
  var self=this;
  self.sendFailTryAgainCount = 0;
  self.beginSend = function (body) {
    api.request("im_open_login_svc", "multiaccount_import", body, function (err, data) {
      if (err) {
        logger.info("timResponseMessageError:%s", err);
      }
      self.sendFailTryAgainCount++;
      logger.info("批量导入用户响应消息=====MessageSuccessStatus:%s,ErrorCode:%s,ErrorInfo:%s,count:%s", data.ActionStatus, data.ErrorCode, data.ErrorInfo, self.sendFailTryAgainCount);
      if(data.ActionStatus!="OK"&& data.ErrorCode!=0&&self.sendFailTryAgainCount<3){
        self.beginSend();
      }
    })
  }
}

var send = function (body) {
  var bea= new beaAccount();
  bea.restoreCount();
  bea.beginSend(body);
}
exports.send=send;



