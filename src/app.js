require('dotenv').config({path:'../.env'});
const logger = require('../utils/logger').getLogger();
const market = require('./services/market-data/market');

const dbMigration = require('./models/db-migration');

// Run database migrations
dbMigration.run(() => {
    logger.info('callback of run migrations');
});

//start listening to market stream