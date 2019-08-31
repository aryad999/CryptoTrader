const logger = require('../../../utils/logger').getLogger();
const KrakenConfig = require('../../../config').kraken;
const WebSocket = require('ws');
const EventManager = require('../market-data/events/event-manager');
const Time = require('../../../utils/time');

let marketWS_4h; 
let marketWS_24h;

let subscribedMarkets = [];
let unsubscribedMarkets = [];
//add event emitter so other modules can listen to market streams

const marketEventStatuses = {
    HEARTBEAT: 'heartbeat',
    SYSTEM_STATUS: 'systemStatus',
    SUBSCRIPTION_STATUS: 'subscriptionStatus'
}

function subscribeToMarket() {

    marketWS_4h = new WebSocket(KrakenConfig.websocket);
    marketWS_24h = new WebSocket(KrakenConfig.websocket);
    // EventManager.setupMarketEventEmitters();

    //subscribe to market with 4h time interval
    marketWS_4h.on('open', (data) => {

        let subscriptionPayload = {
            event: "subscribe",
            pair: [KrakenConfig.currencyPair.xbt_usd],
            subscription: {
                name: KrakenConfig.subscriptionName.ohlc,
                interval: Time.minuteEquivalent.HOUR_4
            }
        };
        marketWS_4h.send(JSON.stringify(subscriptionPayload));
    });

    //subscribe to market with 24h time interval
    // marketWS_24h.on('open', (data) => {

    //     let subscriptionPayload = {
    //         event: "subscribe",
    //         pair: [KrakenConfig.currencyPair.xbt_usd],
    //         subscription: {
    //             name: KrakenConfig.subscriptionName.ohlc,
    //             interval: Time.minuteEquivalent.HOUR_24
    //         }
    //     };
    //     logger.info('marketWS_24h sub payload: ' + JSON.stringify(subscriptionPayload));
    //     marketWS_24h.send(JSON.stringify(subscriptionPayload));
    // });

    marketWS_4h.on('message', (data) => {
        let messageData = JSON.parse(data);
        if (messageData.event == marketEventStatuses.HEARTBEAT) {
            
        } else if (messageData.event == marketEventStatuses.SYSTEM_STATUS) {
            logger.info(JSON.stringify('SYSTEM_STATUS: ' + JSON.stringify(messageData)));
        } else if (messageData.event == marketEventStatuses.SUBSCRIPTION_STATUS) {
            logger.info(JSON.stringify('SYSTEM_STATUS: ' + JSON.stringify(messageData)));
        } else {
            logger.info('messageData: ' + messageData);
            EventManager.marketEvent_4h.emitNewTick(messageData);
        }


    });
    // marketWS_24h.on('message', (data) => {
    //     let messageData = JSON.parse(data);
    //     if (messageData.event != 'heartbeat') {
    //         logger.info('marketWS_24h on(message) ' + JSON.stringify(messageData));
    //         EventManager.marketEvent_24h.emitNewTick();
    //     }


    // });
}


module.exports.subscribeToMarket = subscribeToMarket;
module.exports.marketEventStatuses = marketEventStatuses;

