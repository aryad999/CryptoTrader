const log4js = require('log4js');

function getLogger() {

    const logger = log4js.getLogger();
    //default logger level
    logger.level = 'info';
    
    return logger;
}

module.exports.getLogger = getLogger;