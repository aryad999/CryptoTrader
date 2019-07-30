const krakenConfig = require('../config').kraken;
const WebSocket = require('ws');

const marketWS = new WebSocket(krakenConfig.websocket);

marketWS.on('open', (data) => {

    let subscriptionPayload = {
        event: "subscribe",
        pair: [krakenConfig.currencyPair.xbt_cad],
        subscription: { 
            name: krakenConfig.subscriptionName.ohlc,
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
