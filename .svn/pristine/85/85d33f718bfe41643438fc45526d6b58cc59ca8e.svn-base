/**
 * Created by GLGGAG on 2017/3/16.
 */
var options=require('../../config/redisConfig');
var redis=require('redis');

/*
 连接redis数据库，createClient(port,host,options);
 如果REDIS在本机，端口又是默认，直接写createClient()即可
 redis.createClient() = redis.createClient(6379, '127.0.0.1', {})
 */
var  client = redis.createClient(options);

//错误监听
client.on("error", function (err) {
  console.log("连接redis错误%s " , err);
});

var connet={
  /**
   *
   * @param key
   * @param value
   */
  set:function(key,value) {
  client.set(key, value, function (err,print) {
    if (err){
      console.log(err);
    }else {
      console.log(print)
      return print;
    }
  });
},

  /**
   *
   * @param friKey
   * @param secKey
   * @param value
   */
   hset:function(friKey,secKey,value) {
   client.hset(friKey,secKey,value, function (err,print) {
    if (err){
      console.log(err);
    }else {
      return print;
    }
  });
}


};
module.exports=connet;





