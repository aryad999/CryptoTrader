const KrakenConfig = require('../../../config').kraken;
const WebSocket = require('ws');
const EventManager = require('../market-data/events/event-manager');
const marketWS = new WebSocket(KrakenConfig.websocket);


//add event emitter so other modules can listen to market streams

function subscribeToMarket(){
    //subscribe to market with 4h time interval
    marketWS.on('open', (data) => {

        let subscriptionPayload = {
            event: "subscribe",
            pair: [KrakenConfig.currencyPair.xbt_cad],
            subscription: { 
                name: KrakenConfig.subscriptionName.ohlc,
                interval: 1
            }
        };
    
        marketWS.send(JSON.stringify(subscriptionPayload));
    });

    //subscribe to market with 24h time interval
    marketWS.on('open', (data) => {

        let subscriptionPayload = {
            event: "subscribe",
            pair: [KrakenConfig.currencyPair.xbt_cad],
            subscription: { 
                name: KrakenConfig.subscriptionName.ohlc,
                interval: 1
            }
        };
    
        marketWS.send(JSON.stringify(subscriptionPayload));
    });
    
    marketWS.on('message', (data) => {
        let messageData = JSON.parse(data);
        
        EventManager.
        
    });
}


module.exports.subscribeToMarket = subscribeToMarket;

