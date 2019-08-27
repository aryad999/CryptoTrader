const logger = require('../../../../utils/logger').getLogger();
const _ = require('lodash');


/**
 * Calculates SMA for the period
 * @param {array} candles array of candles in time DESC order (most recent to oldest)
 */
function calculateSMA(candles, period) {
    let smas = [];
    //iterate through entire candles array and use each element as the new base for the SMA
    for (let i = 0; i < candles.length; i++) {
        let priceTotal = 0;
        let smaPeriodCount = 0;
        for (let j = i; (j < (i + period)) && (j < candles.length); j++) {
            let candle = candles[j];
            priceTotal += candle.close;
            smaPeriodCount++;
        }
        let smaValue = priceTotal / smaPeriodCount;
        let sma = {
            smaValue: smaValue,
            endTime: candles[i].endtime
        }
        smas.push(sma);
    }
    logger.info(smas);
    return smas;
}

/**
 * 
 * @param {array} shortPeriodSMA 
 * @param {array} midPeriodSMA 
 * @param {array} longPeriodSMA 
 */
function calculateUpCross(shortPeriodSMA, midPeriodSMA, longPeriodSMA) {

    for (i = 0; i < longPeriodSMA.length - 1; i++) {
        let shortCandle = shortPeriodSMA[i];
        let midCandle = midPeriodSMA[i];
        let longCandle = longPeriodSMA[i];
        let previousShortCandle = shortPeriodSMA[i + 1];
        let previousMidCandle = midPeriodSMA[i + 1];
        let previousLongCandle = longPeriodSMA[i + 1];

        if ((shortCandle.close > midCandle.close) && (previousShortCandle.close < midCandle.close)) {
            
        }
    }
}


/**
 * 
 * @param {array} shortPeriodSMA 
 * @param {array} midPeriodSMA 
 * @param {array} longPeriodSMA 
 */
function calculateDownCross(shortPeriodSMA, midPeriodSMA, longPeriodSMA) {

    for (i = 0; i < longPeriodSMA.length - 1; i++) {
        let shortCandle = shortPeriodSMA[i];
        let midCandle = midPeriodSMA[i];
        let longCandle = longPeriodSMA[i];
        let previousShortCandle = shortPeriodSMA[i + 1];
        let previousMidCandle = midPeriodSMA[i + 1];
        let previousLongCandle = longPeriodSMA[i + 1];

        if ((shortCandle.close < midCandle.close) && (previousShortCandle.close > midCandle.close)) {

        }
    }
}
module.exports.calculateSMA = calculateSMA;
