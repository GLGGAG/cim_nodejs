//Created by GLGGAG on 2017/3/21.
//日志记录
var log4js = require('log4js');
log4js.configure({
  appenders: [
    {
      type: 'console',
      category: "console"
    },
    {
      type : 'dateFile',
      filename : 'logs/',
      pattern : 'yyyy-MM-dd.log',
      alwaysIncludePattern : true,
      category : 'record'
    }
  ],
  replaceConsole: true,
  levels:{
    dateFileLog: 'all',
    console: 'all'
  }
});

var dateFileLog = log4js.getLogger('record');
var consoleLog = log4js.getLogger('console');
exports.logger = dateFileLog;
exports.use = function(app) {
  app.use(log4js.connectLogger(consoleLog, {level:'INFO', format:':remote-addr :method :url :response-time :user-agent'}));
}

