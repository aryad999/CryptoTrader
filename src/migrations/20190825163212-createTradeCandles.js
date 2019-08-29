function up(db, callback) {
    var query =
        " CREATE TABLE IF NOT EXISTS " +
        " trade_candles " +
        " ( trade_id int , " +
        " candle_interval VARCHAR(16) , " +
        " time INT(11) NOT NULL, " +
        " FOREIGN KEY fk_trade_id(trade_id) " +
        " REFERENCES trades(id));"


    db.runSql(query, [], callback);
};

function down(db, callback) {
    return null;
};

module.exports.up = up;
module.exports.down = down;