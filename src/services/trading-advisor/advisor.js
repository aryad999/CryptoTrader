const logger = require('../../../utils/logger').getLogger();
const _ = require('lodash');

const DataManager = require('../data-manager/manager');
const SMA = require('./strategy/sma');
const Trades = require('./models/db/trades');
const TradeCandles = require('./models/db/trade-candles');
const RiskManager = require('../trading-advisor/risk-manager/risk-manager');

let sma_period_5 = [];
let sma_period_8 = [];
let sma_period_13 = [];

function beginAnalysis(recentCandles) {

    let sma_period_5 = SMA.calculateSMA(recentCandles, 5);
    let sma_period_8 = SMA.calculateSMA(recentCandles, 8);
    let sma_period_13 = SMA.calculateSMA(recentCandles, 13);

    //check order table to see if order has been placed and is a buy order-> if so, check for downcross to see when to sell order
    //if no last buy orders, see if opportunity exists to buy by checking upcross-> if so, check with risk management to then place order
    Trades.getByMostRecent('4h', 1)
        .then((result) => {
            if (result.length > 0) {
                let trade_type = result[0].action;
                if (trade_type === 'sell') {
                    createOrderFromUpCross();
                } else if (trade_type === 'buy') {

                }
            }
        })
    let cross = SMA.calculateUpCross(sma_period_5, sma_period_8, sma_period_13);
    logger.info(cross);
    // SMA.calculateDownCross(sma_period_5, sma_period_8, sma_period_13)
}

function createOrderFromUpCross() {
    let upCross = SMA.calculateUpCross(sma_period_5, sma_period_8, sma_period_13);
    if (upCross.didCross) {

    }
}



module.exports.beginAnalysis = beginAnalysis;