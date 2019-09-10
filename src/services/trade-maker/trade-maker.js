const logger = require('../../../utils/logger').getLogger();
const KrakenClient = require('../exchange/client/kraken-client');
const TradeOrder = require('../trading-advisor/models/trade-order');
const Trades = require('../trading-advisor/models/db/trades');
const TradeCandles = require('../trading-advisor/models/db/trade-candles');


function submitTradeOrder(TradeOrder) {
    let tradeTime = Math.floor(Date.now() / 1000);
    KrakenClient.addStandardOrder(TradeOrder)
        .then(result => {
            let price = result;
            let trade = {
                currencyPair: TradeOrder.currencyPair,
                volume: TradeOrder.volume,
                price: '1',
                time: tradeTime,
                action: TradeOrder.action,
                type: TradeOrder.type
            }
            return storeTrade(trade);
        })
        .then((results) => {
            let tradeCandle = {
                trade_id: results.insertId,
                candle_interval: TradeOrder.candleTime,
                time: tradeTime
            };
            return TradeCandles.insert(tradeCandle)
        })
        .then((result) => {
            logger.info(' after TradeCandles.insert(tradeCandle)');
        })
        .catch((err) => {

        })
}

function storeTrade(trade) {
    return Trades.insert(trade);
}
module.exports.submitTradeOrder = submitTradeOrder;