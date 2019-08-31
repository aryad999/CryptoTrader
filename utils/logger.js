const log4js = require('log4js');
const Config = require('../config').logger;
const logger = log4js.getLogger();

Config.debug ? logger.level = 'debug' : logger.level = 'info';


function getLogger() {

    return logger;
}

module.exports.getLogger = getLogger;