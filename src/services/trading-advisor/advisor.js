const logger = require('../../../utils/logger').getLogger();
const _ = require('lodash');

const DataManager = require('../data-manager/manager');
const SMA = require('./strategy/sma');
const Trades = require('./models/db/trades');
const TradeOrder = require('./models/trade-order');
const TradeCandles = require('./models/db/trade-candles');
const TradeMaker = require('../trade-maker/trade-maker');
const RiskManager = require('../trading-advisor/risk-manager/risk-manager');
const Currency = require('../../../utils/currency');

let sma_period_5 = [];
let sma_period_8 = [];
let sma_period_13 = [];

function beginAnalysis(recentCandles) {

    let sma_period_5 = SMA.calculateSMA(recentCandles, 5);
    let sma_period_8 = SMA.calculateSMA(recentCandles, 8);
    let sma_period_13 = SMA.calculateSMA(recentCandles, 13);


    //determine if should look at upcross or downcross
    //based on the last trade that was made
    Trades.getByMostRecent('4h', 1)
        .then((result) => {
            if (result.length > 0) {
                let trade_type = result[0].action;
                if (trade_type === 'sell') {
                    createOrderFromUpCross();
                } else if (trade_type === 'buy') {
                    createOrderFromDownCross();
                }
            } else if (result.length === 0) {
                //the bot has not made any trades yet
                //so we look for a good entry point to buy
                createOrderFromUpCross();
            }
        })
}

//NOTE: will only create order if upcross condition is met
function createOrderFromUpCross() {
    let upCross = SMA.calculateUpCross(sma_period_5, sma_period_8, sma_period_13);
    if (upCross.didCross) {
        logger.warn('createOrderFromUpCross upcross: ')
        logger.warn(upcross)
        let tradeOrder = new TradeOrder(
            Currency.XBTUSD,
            'buy',
            'market',
            RiskManager.calculateOrderVolume()
        );
        tradeOrder.candleTime = upCross.time;
        TradeMaker.submitTradeOrder(tradeOrder);
    }
}

//NOTE: will only create order if downcross condition is met
function createOrderFromDownCross() {
    let downCross = SMA.calculateDownCross(sma_period_5, sma_period_8, sma_period_13);
    logger.warn('createOrderFromDownCross downcross: ')
    logger.warn(downCross)
    if (downCross.didCross) {
        let tradeOrder = new TradeOrder(
            Currency.XBTUSD,
            'sell',
            'market',
            RiskManager.calculateOrderVolume()
        );
        tradeOrder.candleTime = downCross.time;
        TradeMaker.submitTradeOrder(tradeOrder);
    }
}



module.exports.beginAnalysis = beginAnalysis;