const EventEmitter = require('events').EventEmitter;
const MarketEvents = require('../events/market-events');

class MarketEmitter extends EventEmitter {

    emitNewTick() {
        this.emit(MarketEvents.NEW_TICK);
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