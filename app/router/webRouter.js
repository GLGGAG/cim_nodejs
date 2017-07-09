/**
 * Created by GLGGAG on 2017/3/15.*
 * 视图层，类似没有注解的mvc框架需要在xml文件中配置的写法是一至的
 */
//获取路由对象
var express=require('express');
var router = express.Router();
/**
 * 控制器
 */
var index=require('../controllers/home');

//主页
router.get('/node',index.home);












module.exports = router;

