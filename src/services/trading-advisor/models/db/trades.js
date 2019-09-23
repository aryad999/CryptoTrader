const Connection = require('../../../../models/db/connection');

/**
 * 
 * @param {string} timeInterval market time interval (ex: 4h)
 * @param {number} limit numnber of most recent candles
 */
function getByMostRecent(timeInterval, limit) {
    const query =
        " SELECT id, currency_pair, volume, price, time, action, type " +
        " FROM trades " +

        " ORDER BY time DESC LIMIT ? ;"

    const params = [limit];
    return Connection.query(query, params);
}


function insert(trade) {
    const query =
        " INSERT INTO trades " +
        " (currency_pair, volume, price, time, action, type) " +
        " VALUES (?, ?, ?, ?, ?, ?); ";

    let params = [
        trade.currencyPair,
        trade.volume,
        trade.price,
        trade.time,
        trade.action,
        trade.type
    ]
    return Connection.query(query, params);
}


module.exports.insert = insert;
module.exports.getByMostRecent = getByMostRecent;