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

    SMA.calculateUpCross(sma_period_5, sma_period_8, sma_period_13);
    // SMA.calculateDownCross(sma_period_5, sma_period_8, sma_period_13)
}




module.exports.beginAnalysis = beginAnalysis;