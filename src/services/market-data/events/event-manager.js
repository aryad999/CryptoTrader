const MarketEmitter = require('../models/market-emitter');

let marketEvent_4h = new MarketEmitter();
let marketEvent_24h = new MarketEmitter();

module.exports.marketEvent_4h = marketEvent_4h;
module.exports.marketEvent_24h = marketEvent_24h;
