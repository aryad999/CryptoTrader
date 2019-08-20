const Connection = require('../../../models/db/connection');

/**
 * 
 * @param {string} timeInterval market time interval (ex: 4h)
 * @param {array} params [currency_pair, time, endtime, open, high, low, close, vwap, volume, count]
 */
function insertOHLC(timeInterval, params) {
    const query =
        " INSERT INTO ohlc_" + timeInterval +
        " (currency_pair, time, endtime, open, high, low, close, vwap, volume, count) " +
        " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?); ";

    return Connection.query(query, params);
}

/**
 * 
 * @param {string} timeInterval market time interval (ex: 4h)
 * @param {*} timestampFrom unix timestamp
 */
function getOHLCByTimestamp(timeInterval, timestampFrom) {
    const query =
        " SELECT time, open, high, low, close, volume " +
        " FROM ohlc_" + timeInterval +

        " WHERE time >= ? ; ";

    const params = [timestampFrom];
    return Connection.query(query, params);
}

module.exports.insertOHLC = insertOHLC;
module.exports.getOHLCByTimestamp = getOHLCByTimestamp;