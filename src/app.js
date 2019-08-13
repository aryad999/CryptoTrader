require('dotenv').config({path:'../.env'});
const logger = require('../utils/logger').getLogger();
const Market = require('./services/market-data/market');

const dbMigration = require('./models/db-migration');
const MarketManager = require('./services/data-manager/manager');
// Run database migrations
dbMigration.run(() => {
    logger.info('callback of run migrations');
});

//setup market listeners for emitters
MarketManager.setupMarketListeners();

//begin subscription to market data
Market.subscribeToMarket();