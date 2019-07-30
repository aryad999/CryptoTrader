const WebSocket = require('ws');

const marketWS = new WebSocket('wss://ws.kraken.com');

marketWS.on('open', (data) => {
    console.log(` on open ${data}`);

    let subscriptionPayload = {
        event: "subscribe",
        pair: ["XBT/CAD", "BTC/CAD"],
        subscription: { name: "trade" }
    };

    marketWS.send(JSON.stringify(subscriptionPayload));
    const ping = {
        event: "ping"
    }
    marketWS.send(JSON.stringify(ping));
});

marketWS.on('message', (data) => {
    let messageData = JSON.parse(data);
    if (!messageData.event) {
        console.log(` on message ${data}`);
    }
});
