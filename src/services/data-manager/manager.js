const logger = require('../../../utils/logger').getLogger();
const _ = require('lodash');
const OHLC = require('../market-data/models/ohlc');
const ohlcData = require('../market-data/models/ohlc-data');
const time = require('../../../utils/time');
const currency = require('../../../utils/currency');
const EventManager = require('../market-data/events/event-manager');
const MarketEvents = require('../market-data/events/market-events');
const Candlestick = require('./models/candlestick');

let recentCandles = [];

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

    if (lastCandleTime !== ohlc.endtime) { //insert new candle data in db
        ohlcData.insert('4h', ohlc)
            .then((result) => {
                return updateMostRecentCandles();
            })
            .then(() => {

            })
    } else if (lastCandleTime === ohlc.endtime) { //update candle in db with newest data
        ohlcData.updateByTimestamp('4h', ohlc.endtime, ohlc)
            .then((result) => {
                return updateMostRecentCandles();
            })
            .then(() => {

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

function updateMostRecentCandles() {
    return ohlcData.getByMostRecent('4h', 20)
        .then((results) => {
            recentCandles = [];
            _.forEach(results, (result) => {
                let candle = new Candlestick(
                    result.endtime,
                    result.open,
                    result.high,
                    result.low,
                    result.close,
                    result.volume
                );
                recentCandles.push(candle);
            })
            logger.info(recentCandles);
        })
        .catch((err) => {
            logger.error(err);
        });
}
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


module.exports.setupMarketListeners = setupMarketListeners;