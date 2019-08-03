require('dotenv').config();

const logger = require('../utils/logger').getLogger();

const dbMigration = require('./migrations/db-migration');

dbMigration.run(() => {
    logger.info('callback of run migrations');
});

logger.info('after run migrations');
console.log('after run migrations')