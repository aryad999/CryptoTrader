const logger = require('../../../../utils/logger').getLogger();
const Config = require('../../../../config').risk;

function calculateOrderVolume(){
    return Config.default_order_volume;
}

module.exports.calculateOrderVolume = calculateOrderVolume;