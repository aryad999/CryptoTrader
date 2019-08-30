const logger = require('../../../utils/logger').getLogger();
const KrakenClient = require('../exchange/client/kraken-client');
const TradeOrder = require('../trading-advisor/models/trade-order');


function submitTradeOrder(TradeOrder){
    KrakenClient.addStandardOrder()
}


module.exports.submitTradeOrder = submitTradeOrder;