/**
 * Created by GLGGAG on 2017/3/22.
 * tim初始化服务
 */
var TimRestAPI = require('../../thirdParty/timsdk/lib/TimRestApi.js');
// 设置REST API调用基本参数
var config=require("../../thirdParty/timsdk/config/config");
var reqBody=require("../../config/timMesConfig");
var log4js = require("../../config/log.js");
var logger = log4js.logger;

// 调用api的成员函数，实现REST API的调用
var api = new TimRestAPI(config);
// 初始化配置
api.init(function(err, data) {
  if (err){
    logger.info("timInitError:%s", err.message);
    return;
  }
});
module.exports=api;
