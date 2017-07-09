/**
 * Created by GLGGAG on 2017/3/22.
 * 批量导入用户工具
 */
var beachServer=require('../server/timBeachInputAccountServer');
var log4js = require("../../config/log.js");
var logger = log4js.logger;

/**
 * 当前sql是截止至2017年3月22号
 * @param data
 */
module.exports=function (data) {
  if(data==''||data==undefined){
    return;
  }
  var arr=new Array();
  var  length=data.length;
  var count=0;
  var  balance=length%100;
  var  sendCount=parseInt(length/100);
  var i=0;
  var inter=setInterval(function () {
    for(i;i<=sendCount;i++){
      for(var j=i*100;j<i*100+100;j++){
        if(j<length){
          arr.push(data[j].userno.toString());
            if(j==i*100+100-1||j==length-1){
              var addCount={
                "Accounts":arr
              };
              var jsonArr= JSON.stringify(addCount);
              count++;
              logger.info("第"+count+"添加用户:%s",jsonArr);
              arr=[];
              //new beachServer().sendMes(jsonArr);
            }
        }else {
          clearInterval(inter)
        }
      }
    }
    },500)}

