const logger = require('../../../../utils/logger').getLogger();
const EventEmitter = require('events').EventEmitter;
const MarketEvents = require('../events/market-events');
const Candlestick = require('../../data-manager/models/candlestick');

/**
    Represents an emitter which would be subscribed 
    to a specific market interval (ex: OHLC, 4h)
*/
class MarketEmitter extends EventEmitter {

    lastEmittedTickTimestamp;

    constructor() {
        super();
        this.lastEmittedTickTimestamp = Date.now();
    }

    emitNewTick(tick) {
        let ohlcTickData = tick[1];

        let candlestick = new Candlestick(
            ohlcTickData[1],
            ohlcTickData[2],
            ohlcTickData[3],
            ohlcTickData[4],
            ohlcTickData[5],
            ohlcTickData[7]
        );

        let tickData = {
            candlestick: candlestick,
            ohlc: ohlcTickData
        }
        logger.info(tickData);


        this.emit(MarketEvents.NEW_TICK, tickData);
        
        // updates last emitted tick timestamp to represent a new candlestick period
        // note: it is possible to receive updated candlestick data that is 
        // still within the current candlestick time period

        if (this.lastEmittedTickTimestamp !== candlestick.time) {
            this.lastEmittedTickTimestamp = candlestick.time;
            logger.info('updated lasttickTime stamp: ' + this.lastEmittedTickTimestamp + " -> " + candlestick.time);
        }

    }
    subscribeToNewTick(listener) {
        this.addListener(MarketEvents.NEW_TICK, listener);
    }
    unsubscribeFromNewTick(listener) {
        this.removeListener(listener);
    }
}

module.exports = MarketEmitter;