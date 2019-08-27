const _ = require('lodash');


/**
 * Calculates SMA for the period
 * @param {array} candles array of candles in time DESC order (most recent to oldest)
 */
function calculateSMA(candles, period) {

    let smas = [];
    for (let i = 0; i < candles.length; i++) {
        let priceTotal = 0;
        for (let j = i; j < (j + period); j++) {
            let candle = candles[j];
            priceTotal += candle.close;
        }
        let smaValue = priceTotal / period;
        let sma = {
            smaValue: smaValue,
            endTime: candle[i].endTime
        }
        smas.push(sma);
    }

    return smas;
}


module.exports.calculateSMA = calculateSMA;
