require('dotenv').config({ path: '../.env' });
const logger = require('../utils/logger').getLogger();
const dbMigration = require('./models/db/db-migration');
const Market = require('./services/market-data/market');
const DataManager = require('./services/data-manager/manager');
const ohlcData = require('./services/market-data/models/db/ohlc-data');
const insertOhlcScript = require('../scripts/insert-recent-ohlc');


dbMigration.run(() => {
    //check if ohlc tables are populated with historical data
    //and if not fill them with historical ohlc data
    ohlcData.getByTimestamp('4h', 0)
        .then((results) => {
            if (results.length === 0) {
                logger.warn('Empty OHLC tables. Begining to fill...');
                insertOhlcScript.run(() => {
                    logger.warn('Fill OHLC tables complete.');
                    listenToMarket();
                });
            } else {
                listenToMarket();
            }
        })
        .catch((err) => {
            logger.error(err);
        });
});


function listenToMarket() {
    
    DataManager.setupMarketListeners();

    Market.subscribeToMarket();
    logger.info('Currently subscribed to market data...');
}

