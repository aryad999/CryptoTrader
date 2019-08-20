const logger = require('../../../utils/logger').getLogger();
const ohlcData = require('../market-data/models/ohlc-data');
const EventManager = require('../market-data/events/event-manager');
const MarketEvents = require('../market-data/events/market-events');

let listener_4h = (tickData) => {
    logger.info(tickData)
    let ohlc = tickData.ohlc;

    ohlcData.insertOHLC('4h', ohlc)
        .then((result) => {

        })
};

let listener_24h = (tickData) => {
    logger.info(tickData)
    let ohlc = tickData.ohlc;

    ohlcData.insertOHLC('24h', ohlc)
        .then((result) => {

        })
};

function setupMarketListeners() {
    //setup listeners and subscribe to markets
    listenToMarket_4h();
    listenToMarket_24h();

}

function listenToMarket_4h() {
    EventManager.marketEvent_4h.subscribeToNewTick(listener_4h);
}

function unsubFromMarket_4h() {
    EventManager.marketEvent_4h.unsubscribeFromNewTick(listener_4h);
}

function listenToMarket_24h() {
    let listener = (tickData) => {
        console.log('listener candlestick: ' + JSON.stringify(tickData));
    };
    EventManager.marketEvent_24h.subscribeToNewTick(listener);
}

function unsubFromMarket_24h() {
    EventManager.marketEvent_24h.unsubscribeFromNewTick(listener_24h);
}

// ohlcData.getOHLCByTimestamp('24h', 1565195806)
//     .then((data) => {

//         console.log(data);
//     });

module.exports.setupMarketListeners = setupMarketListeners;