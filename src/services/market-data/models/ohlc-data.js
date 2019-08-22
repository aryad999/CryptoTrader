const Connection = require('../../../models/db/connection');

/**
 * 
 * @param {string} timeInterval market time interval (ex: 4h)
 * @param {OHLC} params [currency_pair, time, endtime, open, high, low, close, vwap, volume, count]
 */
function insert(timeInterval, ohlc) {
    const query =
        " INSERT INTO ohlc_" + timeInterval +
        " (currency_pair, time, endtime, open, high, low, close, vwap, volume, count) " +
        " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?); ";

    let params = [
        ohlc.currencyPair,
        ohlc.time,
        ohlc.endtime,
        ohlc.open,
        ohlc.high,
        ohlc.low,
        ohlc.close,
        ohlc.vwap,
        ohlc.volume,
        ohlc.count,
    ]
    return Connection.query(query, params);
}



/**
 * 
 * @param {*} timeInterval market time interval (ex: 4h)
 * @param {*} endTime timestamp for ohlc
 * @param {OHLC} ohlc [time, endtime, open, high, low, close, vwap, volume, count]
 */
function updateByTimestamp(timeInterval, endTime, ohlc) {
    const query =
        " UPDATE  ohlc_" + timeInterval +
        " SET  " +
        " time = ?, " +
        " endtime = ?, " +
        " open = ?, " +
        " high = ?, " +
        " low = ?, " +
        " close = ?, " +
        " vwap = ?, " +
        " volume = ?, " +
        " count = ? " +

        " WHERE endtime = ? ; ";

    let params = [
        ohlc.time,
        ohlc.endtime,
        ohlc.open,
        ohlc.high,
        ohlc.low,
        ohlc.close,
        ohlc.vwap,
        ohlc.volume,
        ohlc.count,
        endTime
    ]

    return Connection.query(query, params);
}

/**
 * 
 * @param {string} timeInterval market time interval (ex: 4h)
 * @param {*} timestampFrom unix timestamp
 */
function getByTimestamp(timeInterval, timestampFrom) {
    const query =
        " SELECT time, open, high, low, close, volume " +
        " FROM ohlc_" + timeInterval +

        " WHERE time >= ? ; ";

    const params = [timestampFrom];
    return Connection.query(query, params);
}

/**
 * 
 * @param {string} timeInterval market time interval (ex: 4h)
 * @param {number} limit numnber of most recent candles
 */
function getByMostRecent(timeInterval, limit) {
    const query =
        " SELECT endtime, open, high, low, close, volume " +
        " FROM ohlc_" + timeInterval +

        " ORDER BY endtime DESC LIMIT ? ;"

    const params = [limit];
    return Connection.query(query, params);
}
module.exports.insert = insert;
module.exports.updateByTimestamp = updateByTimestamp;
module.exports.getByTimestamp = getByTimestamp;
module.exports.getByMostRecent = getByMostRecent;
