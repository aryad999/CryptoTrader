const logger = require('../../../utils/logger').getLogger();
const KrakenClient = require('../exchange/client/kraken-client');
const TradeOrder = require('../trading-advisor/models/trade-order');
const Trades = require('../trading-advisor/models/db/trades');


function submitTradeOrder(TradeOrder) {
    KrakenClient.addStandardOrder(TradeOrder)
        .then(result => {
            let price = result;
            logger.info(result);
            let trade = {
                currency_pair: TradeOrder.currency_pair,
                volume: TradeOrder.volume,
                price: '',
                time: '',
                action: TradeOrder.action,
                type: TradeOrder.type
            }
            return storeTrade(trade);
        })
        .then(()=>{

        })
        .catch((err)=>{
            
        })
}

function storeTrade(trade) {
    return Trades.insert(trade);
}
module.exports.submitTradeOrder = submitTradeOrder;