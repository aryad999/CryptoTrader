function up(db, callback) {
    var query = 
        " CREATE TABLE IF NOT EXISTS " +
        " ohlc_4h " +
        " (id int AUTO_INCREMENT PRIMARY KEY NOT NULL, " +
        " currency_pair VARCHAR(16) , " +
        " time TIMESTAMP NOT NULL, " +
        " endtime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, " +
        " open DECIMAL(10,2) NOT NULL, " +
        " high DECIMAL(10,2) NOT NULL, " +
        " low DECIMAL(10,2) NOT NULL, " +
        " close DECIMAL(10,2) NOT NULL, " +
        " vwap DECIMAL(10,2) , " +
        " volume DECIMAL(14,8) NOT NULL, " +
        " count INT NOT NULL); " +

        " CREATE TABLE IF NOT EXISTS " +
        " ohlc_24h " +
        " (id int AUTO_INCREMENT PRIMARY KEY NOT NULL, " +
        " currency_pair VARCHAR(16) , " +
        " time TIMESTAMP NOT NULL, " +
        " endtime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , " +
        " open DECIMAL(10,2) NOT NULL, " +
        " high DECIMAL(10,2) NOT NULL, " +
        " low DECIMAL(10,2) NOT NULL, " +
        " close DECIMAL(10,2) NOT NULL, " +
        " vwap DECIMAL(10,2) , " +
        " volume DECIMAL(14,8) NOT NULL, " +
        " count INT NOT NULL); ";

    db.runSql(query, [], callback);
};

function down(db, callback) {
    return null;
};

module.exports.up = up;
module.exports.down = down;