/**
 * Created by GLGGAG on 2017/3/16.
 * 添加好友
 * 当添加成功时调用发送消息服务发送自定义消息体
 */
var api=require('./timServerInit');
var log4js = require("../../config/log.js");
var logger = log4js.logger;
var timMessageSend=require('./timSendMessageServer');
var initMesBody=require('../../config/timMesConfig');
var initInputAccBody=require('../../config/timAddFriConfig');
var inputAccSend=require('./timSingleInputAccountServer');

var addFriends=function () {
  var self=this;
  self.sendFailTryAgainCount = 0;
  self.inputAccInfo={};
  self.beginSend = function (body,inpBody) {
    api.request("sns", "friend_add", body, function (err, data) {
      if (err) {
        logger.info("timResponseMessageError:%s", err);
      }
      self.sendFailTryAgainCount++;
      logger.info("添加好友响应消息=====SuccessStatus:%s,ErrorCode:%s,ErrorInfo:%s,count:%s", data.ActionStatus, data.ErrorCode, data.ErrorInfo, self.sendFailTryAgainCount);
      if (data.ActionStatus != "OK" && data.ErrorCode != 0 && self.sendFailTryAgainCount < 3) {
        self.beginSend(body,inpBody);
      } else if (data.ActionStatus == "OK" && data.ErrorCode == 0) {
        var mesBody = self.buildMesBody(body);
        //调用发送消息接口发送好友消息
        timMessageSend.send(mesBody);
      }
      if(self.sendFailTryAgainCount==3){
        if(inpBody==undefined){
          var addbody=self.buildInputAccBody(body);
          inputAccSend.send(body,JSON.parse(body).From_Account);
        }else {
          inputAccSend.send(inpBody,JSON.parse(body).From_Account);
        }
      }
    })
  }
  self.buildInputAccBody=function (body) {
    var initInputAccBody={"Identifier":JSON.parse(body).AddFriendItem[0].To_Account.toString()};
    return JSON.stringify(initInputAccBody);
  };

  self.buildMesBody=function (body) {
    var obBody=JSON.parse(body);
    var to_Account = obBody.From_Account;
    var from_Account = obBody.AddFriendItem[0].To_Account;
    initMesBody.From_Account = from_Account.toString();
    initMesBody.To_Account= to_Account.toString();
    return JSON.stringify(initMesBody);
  }
};

var send=function (body) {
  var add=new addFriends();
  var obBody=JSON.parse(body);
  var avator=obBody.avator;
  var nickName=obBody.nickName;
  if(avator!=undefined&&nickName!=undefined){
      var addBody={
        "From_Account":"test1",
        "AddFriendItem":
          [
            {
              "To_Account":"test1",
              "GroupName":"患者",
              "AddSource":"AddSource_Type_Weixin",
              "Remark":""
            }
          ],
        "AddType":"Add_Type_Both",
        "ForceAddFlags":1
      }
    addBody.From_Account=obBody.From_Account.toString();
    addBody.AddFriendItem[0].To_Account=obBody.AddFriendItem[0].To_Account.toString();
    addBody.AddFriendItem[0].GroupName=obBody.AddFriendItem[0].GroupName.toString();
    addBody.AddFriendItem[0].AddSource=obBody.AddFriendItem[0].AddSource.toString();
    addBody.AddFriendItem[0].Remark=obBody.AddFriendItem[0].Remark.toString();
    var inpBody={
      "Identifier":"test1",
      "Nick":"test",
      "FaceUrl":"http://www.qq.com"
    }
    inpBody.Identifier=obBody.AddFriendItem[0].To_Account.toString();
    inpBody.Nick=obBody.nickName.toString();
    inpBody.FaceUrl=obBody.avator.toString();
    add.beginSend(JSON.stringify(addBody),JSON.stringify(inpBody));
  }else {
    add.beginSend(body);
  }
}
exports.send=send;


