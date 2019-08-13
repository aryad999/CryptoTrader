const ohlcData = require('../market-data/models/ohlc-data');
const EventManager = require('../market-data/events/event-manager');
const MarketEvents = require('../market-data/events/market-events');


function listenToMarket(){

    EventManager.marketEvent_24h.addListener(MarketEvents.NEW_TICK, )
}

ohlcData.getOHLCByTimestamp('24h', 1565195806)
    .then((data) => {
        
        console.log(data);
    });