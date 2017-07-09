/**
 * Created by GLGGAG on 2017/3/16.
 */
var options=require('../../config/mysqlConfig');
var mysql=require('mysql');
var pool=mysql.createPool(options);
var beachAccountHelper=require('../helper/beachInputAccount')
var log4js = require("../../config/log.js");
var logger = log4js.logger;
/**
 * 同步控制框架，NodeJs是异步IO，所以当查询数据库是，是异步线程在执行，
 * 当某些场景下需要同步得到结果集然后处理某些事前时
 * 需要同步控制流程
 */
var async = require("async");


var connect= {
  /**
   * @param sqlString  需要执行的sql，包含占位符
   * @param value  查询参数
   */
  executeQuery: function (sqlString,value) {
    var result=null;
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log("建立连接数据库失败%s", err);
      } else {
        connection.query(sqlString, value, function (err, results) {
          if (err) {
            console.log("查询失败%s", err);
          } else {
            console.log("查询结果为：" + results.length);
            beachAccountHelper(results);
          }
        });
        connection.release();
      }
    });
  },


  /**
   * 插入，事务
   * @param sqlString
   * @param value
   */
  executeInsert:function (sqlString,value) {
    pool.getConnection(function (err,connection) {
      if (err) {
        console.log("建立连接数据库失败%s", err);
      } else {
        connection.beginTransaction(function (err) {
          if (err) {
            throw err;
          }
          connection.query(sqlString, value, function (error, results, fields) {
            if (error) {
              return connection.rollback(function () {
                throw error;
              });
            }
            connection.commit(function (err) {
              if (err) {
                return connection.rollback(function () {
                  throw err;
                });
              }
              console.log('success!');
            });
          });
        });
        connection.release();
      };
    });
  },

  /**
   * 删 事务
   * @param sqlString
   * @param value
   */
  executeDelete:function (sqlString,value) {
    pool.getConnection(function (err,connection) {
      if(err){
        console.log("建立连接数据库失败%s",err);
      }else {
        connection.beginTransaction(function (err) {
          if (err) {
            throw err;
          }
          connection.query(sqlString, value, function (error, results, fields) {
            if (error) {
              return connection.rollback(function () {
                throw error;
              });
            }
            connection.commit(function (err) {
              if (err) {
                return connection.rollback(function () {
                  throw err;
                });
              }
              console.log('success!');
            });
          });
        });
      };
      connection.release();
    });
  },


  /**
   * 改 事务
   * @param sqlString
   * @param value
   */
  executeUpdate:function (sqlString,value) {
    pool.getConnection(function (err,connection) {
      if(err){
        console.log("建立连接失败%s",err);
      }else {
        connection.beginTransaction(function (err) {
          if (err) {
            throw err;
          }
          connection.query(sqlString, value, function (error, results, fields) {
            if (error) {
              return connection.rollback(function () {
                throw error;
              });
            }
            connection.commit(function (err) {
              if (err) {
                return connection.rollback(function () {
                  throw err;
                });
              }
              console.log('success!');
            });
          });
        });
      };
      connection.release();
    });
  }

};

module.exports=connect;







