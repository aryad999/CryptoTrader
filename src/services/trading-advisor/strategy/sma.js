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
            value: smaValue,
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
        let shortSMA = shortPeriodSMA[i];
        let midSMA = midPeriodSMA[i];
        let longSMA = longPeriodSMA[i];
        let previousShortSMA = shortPeriodSMA[i + 1];
        let previousMidSMA = midPeriodSMA[i + 1];
        let previousLongSMA = longPeriodSMA[i + 1];

        if ((shortSMA.value > midSMA.value) && (previousShortSMA.value < midSMA.value)) {
            logger.info('UPCROSS SHORT CANDLE 1:')
            logger.info(shortSMA)
            logger.info('UPCROSS MID CANDLE 1:')
            logger.info(midSMA)
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
        let shortSMA = shortPeriodSMA[i];
        let midSMA = midPeriodSMA[i];
        let longSMA = longPeriodSMA[i];
        let previousShortSMA = shortPeriodSMA[i + 1];
        let previousMidSMA = midPeriodSMA[i + 1];
        let previousLongSMA = longPeriodSMA[i + 1];

        if ((shortSMA.value < midSMA.value) && (previousShortSMA.value > midSMA.value)) {
            logger.info('DOWNCROSS SHORT CANDLE')
            logger.info(shortSMA);
        }
    }
}
module.exports.calculateSMA = calculateSMA;
module.exports.calculateUpCross = calculateUpCross;
module.exports.calculateDownCross = calculateDownCross;
