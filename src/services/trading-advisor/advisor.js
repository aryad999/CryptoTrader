const logger = require('../../../utils/logger').getLogger();
const _ = require('lodash');

const DataManager = require('../data-manager/manager');
const SMA = require('./strategy/sma');

let sma_period_5 = [];
let sma_period_8 = [];
let sma_period_13 = [];

function beginAnalysis(recentCandles) {

    let sma_period_5 = SMA.calculateSMA(recentCandles, 5);
    let sma_period_8 = SMA.calculateSMA(recentCandles, 8);
    let sma_period_13 = SMA.calculateSMA(recentCandles, 13);

    //check order table to see if order has been placed and is still open-> if so, check for downcross to see when to sell order
    //if no open orders, see if opportunity exists to buy by checking upcross-> if so, check with risk management to then place order
    let cross = SMA.calculateUpCross(sma_period_5, sma_period_8, sma_period_13);
    logger.info(cross);
    // SMA.calculateDownCross(sma_period_5, sma_period_8, sma_period_13)
}




module.exports.beginAnalysis = beginAnalysis;