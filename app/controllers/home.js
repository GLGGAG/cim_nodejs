/**
 * Created by GLGGAG on 2017/3/15.
 * @type {Article}
 * nodeJsS是基于模块化管理，当不需要的模块没有关联引入时，不会加载进内存
 * 因此如果需要在应用启动时，希望加载预想中的无关联模块，必须有引入在某一个被加载进内存的模块中
 */
var Article = require('../models/article');
var connet=require('../dao/dataSource');
//var redisConnect=require('../dao/redisSource');
var timsend=require('../server/timSendMessageServer');
//var reqBody=require('../../config/timMesConfig');
//登录主页的调用的方法
exports.home=function(req, res){
  var articles = [new Article(), new Article()];
 /* connet.executeQuery("SELECT userno FROM userbuyer u WHERE  u.isEnable=?",'TRUE');
  connet.executeQuery("SELECT userno FROM userseller u WHERE u.isEnable=?",'TRUE');*/
  /**
   * 处理代码逻辑，获取参数，cookie,session,及调用server层进行CRUD
   */
  //connet.executeUpdate("update userbuyer set nickName=? where id=?",['领导',40]);
  //redisConnect.hset("dushiecs","xiaopihai",11111);
  //new timsend().sendMsg(reqBody);
  res.render('index', {
    title: 'Generator-Express MVC',
    articles: articles
  });
};
