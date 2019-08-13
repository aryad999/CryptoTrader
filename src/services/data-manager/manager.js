const logger = require('../../../utils/logger').getLogger();
const ohlcData = require('../market-data/models/ohlc-data');
const EventManager = require('../market-data/events/event-manager');
const MarketEvents = require('../market-data/events/market-events');


function setupMarketListeners() {
    //setup listeners and subscribe to markets
    listenToMarket_4h();
    listenToMarket_24h();

}

function listenToMarket_4h() {
    let listener = (candlestick) => {
        logger.info(candlestick)
    };
    EventManager.marketEvent_4h.subscribeToNewTick(listener);
}

function listenToMarket_24h() {
    let listener = (candlestick) => {
        console.log('listener candlestick: ' + JSON.stringify(candlestick));
    };
    EventManager.marketEvent_24h.subscribeToNewTick(listener);
}

// ohlcData.getOHLCByTimestamp('24h', 1565195806)
//     .then((data) => {

//         console.log(data);
//     });

module.exports.setupMarketListeners = setupMarketListeners;