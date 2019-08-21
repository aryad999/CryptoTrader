require('dotenv').config({ path: '../../.env' });
const MarketHistory = require('../../src/services/market-data/market-history');


const _ = require('lodash');
const time = require('../../utils/time').minuteEquivalent;

const ohlcData = require('../../src/services/market-data/models/ohlc-data');
const OHLC = require('../../src/services/market-data/models/ohlc');

let numFinished = 0;
//Retrieve the most recent 720 data points
// and sequentially insert them in the respective tables
function run(callback) {
    //Setup 24h time interval ohlc table
    let ohlc_24h_promise = MarketHistory.ohlc('XBTUSD', time.HOUR_24)
        .then(ohlcDataResult => {
            async function insertOHLC_24h() {
                let ohlcDataArray = ohlcDataResult.result['XXBTZUSD'];
                for (let i = 0; i < ohlcDataArray.length; i++) {

                    //populate the object from the market data call
                    let ohlcResult = ohlcDataArray[i];
                    let ohlc = new OHLC(
                        'XBTUSD',
                        time.HOUR_24,
                        ohlcResult[0],
                        ohlcResult[0],
                        ohlcResult[1],
                        ohlcResult[2],
                        ohlcResult[3],
                        ohlcResult[4],
                        ohlcResult[5],
                        ohlcResult[6],
                        ohlcResult[7]
                    );
                    try {
                        await ohlcData.insertOHLC('24h', [
                            ohlc.currencyPair, ohlc.time,
                            ohlc.endtime, ohlc.open,
                            ohlc.high, ohlc.low,
                            ohlc.close, ohlc.vwap,
                            ohlc.volume, ohlc.count]);

                        if (i + 1 === ohlcDataArray.length) {
                            finishedScript(callback);
                        }
                    } catch{

                    }
                }
            }
            insertOHLC_24h();
        });



    //Setup 4h time interval ohlc table
    let ohlc_4h_promise = MarketHistory.ohlc('XBTUSD', time.HOUR_4)
        .then(ohlcDataResult => {
            async function insertOHLC_4h() {
                let ohlcDataArray = ohlcDataResult.result['XXBTZUSD'];
                for (let i = 0; i < ohlcDataArray.length; i++) {

                    //populate the object from the market data call
                    let ohlcResult = ohlcDataArray[i];
                    let ohlc = new OHLC(
                        'XBTUSD',
                        time.HOUR_24,
                        ohlcResult[0],
                        ohlcResult[0],
                        ohlcResult[1],
                        ohlcResult[2],
                        ohlcResult[3],
                        ohlcResult[4],
                        ohlcResult[5],
                        ohlcResult[6],
                        ohlcResult[7]
                    );
                    console.log(ohlc)
                    try {
                        await ohlcData.insertOHLC('4h', [
                            ohlc.currencyPair, ohlc.time,
                            ohlc.endtime, ohlc.open,
                            ohlc.high, ohlc.low,
                            ohlc.close, ohlc.vwap,
                            ohlc.volume, ohlc.count]);

                        if (i + 1 === ohlcDataArray.length) {
                            finishedScript(callback);
                        }
                    } catch{

                    }

                }
            }
            insertOHLC_4h();
        });
}

function finishedScript(callback) {
    console.log('finishedScript called')
    numFinished++;
    if (numFinished === 2) {
        console.log('finishedScript BOTH DONE')
        callback();
    }
}
module.exports.run = run;
