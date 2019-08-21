const logger = require('../../../utils/logger').getLogger();
const OHLC = require('../market-data/models/ohlc');
const ohlcData = require('../market-data/models/ohlc-data');
const time = require('../../../utils/time');
const currency = require('../../../utils/currency');
const EventManager = require('../market-data/events/event-manager');
const MarketEvents = require('../market-data/events/market-events');

let listener_4h = (tickData) => {
    logger.info(tickData)
    let lastCandleTime = EventManager.marketEvent_4h.lastEmittedTickTimestamp;
    let tickOHLC = tickData.ohlc;
    let ohlc = new OHLC(
        currency.XBTUSD,
        time.minuteEquivalent.HOUR_4,
        tickOHLC[0],
        tickOHLC[1],
        tickOHLC[2],
        tickOHLC[3],
        tickOHLC[4],
        tickOHLC[5],
        tickOHLC[6],
        tickOHLC[7],
        tickOHLC[8]

    )

    console.log('lastCandleTime' + lastCandleTime);
    console.log('ohlc.endtime' + ohlc.endtime);

    if (lastCandleTime !== ohlc.endtime) {
        ohlcData.insert('4h', ohlc)
            .then((result) => {

            })
    } else if (lastCandleTime === ohlc.endtime) {
        ohlcData.updateByTimestamp('4h', ohlc.endtime, ohlc)
            .then((result) => {

            })
    }

};

let listener_24h = (tickData) => {
    logger.info(tickData)
    let ohlc = tickData.ohlc;

    ohlcData.insert('24h', ohlc)
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