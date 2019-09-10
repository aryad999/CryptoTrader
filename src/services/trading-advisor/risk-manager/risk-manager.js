const logger = require('../../../../utils/logger').getLogger();
const Config = require('../../../../config').risk;

let lastBuyOrderTimestamp = 0;

function allowedToBuy() {
    if ((Date.now() / 1000 - lastBuyOrderTimestamp) < 20000) {
        return false;
    } else {
        return true;
    }
}

function setLastBuyOrderTime(timestamp) {
    lastBuyOrderTimestamp = timestamp;
}

function calculateOrderVolume() {
    return Config.default_order_volume;
}

module.exports.calculateOrderVolume = calculateOrderVolume;
module.exports.setLastBuyOrderTime = setLastBuyOrderTime;