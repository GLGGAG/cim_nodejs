/**
 * Created by GLGGAG on 2017/3/16.
 */

/**
 *
 * mysql连接池的配置
 */
var options={
  host : 'localhost',
  port : 3306,
  database : 'dushiec',
  user : 'root',
  password : 'root',
  connectionLimit : 10
};
module.exports = options;
