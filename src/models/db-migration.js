const mysqlConfig = require('../../config').mysql;
const DBMigrate = require('db-migrate');

const logger = require('../../utils/logger').getLogger();


const options = {
    config: {
        dev: {
            driver: "mysql",
            host: 'localhost',
            port: '3306',
            user: mysqlConfig.user,
            password: mysqlConfig.password,
            database: mysqlConfig.database,
            multipleStatements: true
        },
        prod: {
            driver: "mysql",
            host: 'localhost',
            port: '3306',
            user: mysqlConfig.user,
            password: mysqlConfig.password,
            database: mysqlConfig.database,
            multipleStatements: true
        }
    }
};

logger.info(options);
function run(callback) {

    logger.info('Running migrations...');
    var migrate = DBMigrate.getInstance(true, options);
    migrate.up(function (err) {
        if (err) {
            logger.error('DB Migrations error', err);
        } else {
            logger.info('Finished DB Migrations.');
        }
        callback();
    });
};

module.exports.run = run;