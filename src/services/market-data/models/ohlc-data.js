const Connection = require('../../../models/db/connection');

function insertOHLC(timeCode, params) {
    const query =
        " INSERT INTO ohlc_" + timeCode +
        " (currency_pair, time, endtime, open, high, low, close, vwap, volume, count ) " +
        " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?); ";

    return Connection.query(query, params);
}

function getOHLCByTimestamp(timeCode, timestampFrom) {
    const query =
        " SELECT time, open, high, low, close, volume " +
        " FROM ohlc_" + timeCode +

        " WHERE time > ?; "

    const params = [timestampFrom];
    return Connection.query(query, params);
}

module.exports.insertOHLC = insertOHLC;
module.exports.getOHLCByTimestamp = getOHLCByTimestamp;