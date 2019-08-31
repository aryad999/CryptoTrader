//To be rebuilt in Go in future
require('dotenv').config({ path: '../.env' });
const logger = require('../utils/logger').getLogger();
const Market = require('./services/market-data/market');

const dbMigration = require('./models/db/db-migration');
const MarketManager = require('./services/data-manager/manager');
const ohlcData = require('./services/market-data/models/db/ohlc-data');
const insertOhlcScript = require('../scripts/node_scripts/insert-recent-ohlc');

// Run database migrations
dbMigration.run(() => {
    logger.info('callback of run migrations');

    //check if ohlc tables are populated with historical data
    //and if not fill them with historical ohlc
    ohlcData.getByTimestamp('4h', 0)
        .then((results) => {
            if (results.length === 0) {
                logger.info('Empty OHLC tables. Begining to fill...');
                insertOhlcScript.run(() => {
                    logger.info('Fill OHLC tables complete.');
                    listenToMarket();
                });
            } else {
                listenToMarket();
            }
        })
        .catch((err) => {
            logger.info(err);
        });
});


function listenToMarket() {
    MarketManager.setupMarketListeners();

    //begin subscription to market data
    Market.subscribeToMarket();
}