require('dotenv').config({path:'../.env'});
const logger = require('../utils/logger').getLogger();
const Market = require('./services/market-data/market');

const dbMigration = require('./models/db-migration');
const test = require('./services/data-manager/manager');
// Run database migrations
dbMigration.run(() => {
    logger.info('callback of run migrations');
});

//start listening to market stream
Market.subscribeToMarket();