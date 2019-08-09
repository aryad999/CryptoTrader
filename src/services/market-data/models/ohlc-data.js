const Connection = require('../../../models/connection');

function insertOHLC_24h() {
    const query =
        " INSERT INTO ohlc_24h (currency_pair, time, endtime, open, high, low, close, vwap, volume, count ) " +
        " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?); ";

    const params = [];

        return Connection.query(query, params);
}


module.exports.insertOHLC_24h = insertOHLC_24h;