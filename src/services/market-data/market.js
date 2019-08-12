const KrakenConfig = require('../../../config').kraken;
const WebSocket = require('ws');
const EventManager = require('../market-data/events/event-manager');
const Time = require('../../../utils/time');

const marketWS_4h = new WebSocket(KrakenConfig.websocket);
const marketWS_24h = new WebSocket(KrakenConfig.websocket);


//add event emitter so other modules can listen to market streams

function subscribeToMarket() {
    //subscribe to market with 4h time interval
    marketWS_4h.on('open', (data) => {

        let subscriptionPayload = {
            event: "subscribe",
            pair: [KrakenConfig.currencyPair.xbt_cad],
            subscription: {
                name: KrakenConfig.subscriptionName.ohlc,
                interval: Time.minuteEquivalent.HOUR_4
            }
        };
        console.log(subscriptionPayload);
        marketWS_4h.send(JSON.stringify(subscriptionPayload));
    });

    //subscribe to market with 24h time interval
    marketWS_24h.on('open', (data) => {

        let subscriptionPayload = {
            event: "subscribe",
            pair: [KrakenConfig.currencyPair.xbt_cad],
            subscription: {
                name: KrakenConfig.subscriptionName.ohlc,
                interval: Time.minuteEquivalent.HOUR_24
            }
        };
        console.log(subscriptionPayload);
        marketWS_24h.send(JSON.stringify(subscriptionPayload));
    });

    marketWS_4h.on('message', (data) => {
        let messageData = JSON.parse(data);
        console.log(messageData);
        EventManager.marketEvent_4h.emitNewTick();

    });
    marketWS_24h.on('message', (data) => {
        let messageData = JSON.parse(data);
        console.log(messageData);
        EventManager.marketEvent_24h.emitNewTick();

    });
}


module.exports.subscribeToMarket = subscribeToMarket;

