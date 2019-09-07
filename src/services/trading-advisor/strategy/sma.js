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
            time: candles[i].time
        }
        smas.push(sma);
    }
    return smas;
}

/**
 * Calculates the upcross point(candle) given the short, mid and long smas
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

        if ((shortSMA.value > midSMA.value) && (previousShortSMA.value < previousMidSMA.value)) {
            let cross = {
                didCross: true,
                time: shortSMA.time
            }
            return cross;
        }
    }
    return {
        didCross: false
    }

}


/**
 * Calculates the downcross point(candle) given the short, mid and long smas
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

        if ((shortSMA.value < midSMA.value) && (previousShortSMA.value > previousMidSMA.value)) {
            let cross = {
                didCross: true,
                time: shortSMA.time
            }
            return cross;
        }
    }
    return {
        didCross: false
    }
}
module.exports.calculateSMA = calculateSMA;
module.exports.calculateUpCross = calculateUpCross;
module.exports.calculateDownCross = calculateDownCross;
