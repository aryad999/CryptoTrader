
function insert(trade_candle) {
    const query =
        " INSERT INTO trade_candles " +
        " (trade_id, candle_interval, time) " +
        " VALUES (?, ?, ?); ";

    let params = [
        trade_candle.trade_id,
        trade_candle.candle_interval,
        trade_candle.time
    ]
    return Connection.query(query, params);
}


module.exports.insert = insert;