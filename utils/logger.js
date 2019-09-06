const log4js = require('log4js');
const Config = require('../config').logger;
const logger = log4js.getLogger('|');

logger.level = Config.debug ? 'debug' : 'info';


function getLogger() {

    return logger;
}

module.exports.getLogger = getLogger;