const logger = require('../../../utils/logger').getLogger();
const KrakenConfig = require('../../../config').kraken;
const WebSocket = require('ws');
const EventManager = require('../market-data/events/event-manager');
const Time = require('../../../utils/time');

let marketWS_4h;
let marketWS_24h;

let subscribedMarkets = [];
let unsubscribedMarkets = [];

//kraken websocket statuses
const marketEventStatuses = {
    HEARTBEAT: 'heartbeat',
    SYSTEM_STATUS: 'systemStatus',
    SUBSCRIPTION_STATUS: 'subscriptionStatus'
}

function subscribeToMarket() {

    marketWS_4h = new WebSocket(KrakenConfig.websocket);

    //subscribe to market with 4h time interval
    marketWS_4h.on('open', (data) => {

        let subscriptionPayload = {
            event: "subscribe",
            pair: [KrakenConfig.currencyPair.xbt_usd],
            subscription: {
                name: KrakenConfig.subscriptionName.ohlc,
                interval: Time.minuteEquivalent.MINUTES_1
            }
        };
        marketWS_4h.send(JSON.stringify(subscriptionPayload));
        subscribedMarkets.push({market: 'marketWS_4h'});
    });

    marketWS_4h.on('message', (data) => {
        let messageData = JSON.parse(data);
        if (messageData.event == marketEventStatuses.HEARTBEAT) {
            //heartbeat statuses let the bot know that the websocket connection is still alive
        } else if (messageData.event == marketEventStatuses.SYSTEM_STATUS) {
            logger.warn('------ Market Websocket - 4h: Received SYSTEM_STATUS: ------');
            logger.warn(messageData);
        } else if (messageData.event == marketEventStatuses.SUBSCRIPTION_STATUS) {
            logger.warn('------ Market Websocket - 4h: Received SUBSCRIPTION_STATUS: ------');
            logger.warn(messageData);
        } else {
            //emit the new data to interested listeners
            EventManager.marketEvent_4h.emitNewTick(messageData);
        }

    });
}


module.exports.subscribeToMarket = subscribeToMarket;
module.exports.marketEventStatuses = marketEventStatuses;

