const _ = require('lodash');

/**
 * Calculates SMA of whole length of price array
 * @param {array} prices array of price values for each interval period
 */
function calculateSMA(prices) {
    let priceTotal = 0;
    _.forEach(prices, (price) => {
        priceTotal += price;
    });

    let smaValue = priceTotal / prices.length;
    return smaValue;
}
