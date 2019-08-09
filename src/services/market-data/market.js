const KrakenConfig = require('../../../config').kraken;
const WebSocket = require('ws');

const marketWS = new WebSocket(KrakenConfig.websocket);

//add event emitter so other modules can listen to market streams

function subscribeToMarket(){
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
        const ping = {
            event: "ping"
        }
        marketWS.send(JSON.stringify(ping));
    });
    
    marketWS.on('message', (data) => {
        let messageData = JSON.parse(data);
        
        console.log(` on message ${data}`);
        
    });
}


module.exports.subscribeToMarket = subscribeToMarket;

