const logger = require('../../../../utils/logger').getLogger();
const Config = require('../../../../config').risk;

function calculateOrderVolume(){
    return Config.default_volume;
}