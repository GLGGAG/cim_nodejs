var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'cim-node'
    },
    port: process.env.PORT || 2500,
  },

  test: {
    root: rootPath,
    app: {
      name: 'cim-node'
    },
    port: process.env.PORT || 2500,
  },

  production: {
    root: rootPath,
    app: {
      name: 'cim-node'
    },
    port: process.env.PORT || 2500,
  }
};

module.exports = config[env];
