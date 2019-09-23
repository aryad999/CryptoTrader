const Connection = require('../../../../models/db/connection');

/**
 * Insert ohlc candle with corresponding data into ohlc table
 * @param {string} timeInterval market time interval (ex: 4h)
 * @param {OHLC} params [currency_pair, updated_time, time, open, high, low, close, vwap, volume, count]
 */
function insert(timeInterval, ohlc) {
    const query =
        " INSERT INTO ohlc_" + timeInterval +
        " (currency_pair, updated_time, time, open, high, low, close, vwap, volume, count) " +
        " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?); ";

    let params = [
        ohlc.currencyPair,
        ohlc.updated_time,
        ohlc.time,
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
 * Update ohlc candle data based on timestamp condition
 * @param {*} timeInterval market time interval (ex: 4h)
 * @param {*} time timestamp for ohlc
 * @param {OHLC} ohlc [updated_time, time, open, high, low, close, vwap, volume, count]
 */
function updateByTimestamp(timeInterval, time, ohlc) {
    const query =
        " UPDATE  ohlc_" + timeInterval +
        " SET  " +
        " updated_time = ?, " +
        " time = ?, " +
        " open = ?, " +
        " high = ?, " +
        " low = ?, " +
        " close = ?, " +
        " vwap = ?, " +
        " volume = ?, " +
        " count = ? " +

        " WHERE time = ? ; ";

    let params = [
        ohlc.updated_time,
        ohlc.time,
        ohlc.open,
        ohlc.high,
        ohlc.low,
        ohlc.close,
        ohlc.vwap,
        ohlc.volume,
        ohlc.count,
        time
    ]

    return Connection.query(query, params);
}

/**
 * Retrieve ohlc candles based on timestamp condition
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
 * Get the n=limit most recent ohlc candles
 * @param {string} timeInterval market time interval (ex: 4h)
 * @param {number} limit numnber of most recent candles
 */
function getByMostRecent(timeInterval, limit) {
    const query =
        " SELECT time, open, high, low, close, volume " +
        " FROM ohlc_" + timeInterval +

        " ORDER BY time DESC LIMIT ? ;"

    const params = [limit];
    return Connection.query(query, params);
}
module.exports.insert = insert;
module.exports.updateByTimestamp = updateByTimestamp;
module.exports.getByTimestamp = getByTimestamp;
module.exports.getByMostRecent = getByMostRecent;
