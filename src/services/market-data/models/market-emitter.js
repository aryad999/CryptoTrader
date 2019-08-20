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
        this.lastTickTimestamp = Date.now();
    }

    emitNewTick(tickData) {
        let filteredTickData = tickData[1];

        let candlestick = new Candlestick(
            filteredTickData[1],
            filteredTickData[2],
            filteredTickData[3],
            filteredTickData[4],
            filteredTickData[5],
            filteredTickData[7]
        );

        this.emit(MarketEvents.NEW_TICK, candlestick);

        // updates last emitted tick timestamp to represent a new candlestick period
        // note: it is possible to receive updated candlestick data that is 
        // still within the current candlestick time period
        if (this.lastEmittedTickTimestamp !== candlestick.endtime) {
            this.lastEmittedTickTimestamp = candlestick.endtime;
        }
        console.log('new tick emitted');
    }
    subscribeToNewTick(listener) {
        this.addListener(MarketEvents.NEW_TICK, listener);
    }
    unsubscribeFromNewTick(listener) {
        this.removeListener(listener);
    }
}

module.exports = MarketEmitter;