const _ = require('lodash');
const defaultConfig = require('./default.js');

const envConfig = require('./' + (process.env.NODE_ENV || "development") + ".js");

module.exports = _.merge({}, defaultConfig, envConfig);
