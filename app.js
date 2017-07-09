/**
 * app启动入口，此入口可设置随应用启动的连接，如启动项目时连接redis，mysql......
 */
var express = require('express'),
  config = require('./config/config');

var app = express();

module.exports = require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

