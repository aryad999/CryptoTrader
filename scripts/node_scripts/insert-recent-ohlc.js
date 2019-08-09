const _ = require('lodash');
const time = require('../../utils/time').minuteEquivalent;

const MarketHistory = require('../../src/services/market-data/market-history');
const ohlcData = require('../../src/services/market-data/models/ohlc-data');



MarketHistory.ohlcData('XBTCAD', time.HOUR_24)
    .then(ohlcDataResult => {
        let ohlcDataArray = ohlcDataResult.result['XXBTZCAD'];
        _.forEach(ohlcDataArray, (ohlcResult) => {
            ohlcData.insertOHLC_24h(ohlcResult)
            .then(result => {

            })
            .catch(error => {

            })
        })
    });