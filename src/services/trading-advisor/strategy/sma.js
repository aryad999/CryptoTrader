const _ = require('lodash');


/**
 * Calculates SMA for the given start-end
 * @param {array} candles array of candles in time DESC order (most recent to oldest)
 */
function calculateSMA(candles, start, end) {

    let sma = [];
    for (let i = start; i < (end - start); i++) {
        let priceTotal = 0;
        for (let j = start; j < end; j++) {
            let candle = candles[j];
            priceTotal += candle.close;
        }
        let smaValue = priceTotal / period;
        sma.push(smaValue);
    }

    return sma;
}


module.exports.calculateSMA = calculateSMA;
