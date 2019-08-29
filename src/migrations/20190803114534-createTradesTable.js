function up(db, callback) {
    var query =
        " CREATE TABLE IF NOT EXISTS " +
        " trades " +
        " (id int AUTO_INCREMENT PRIMARY KEY NOT NULL, " +
        " currency_pair VARCHAR(16) , " +
        " volume DECIMAL(14,8) NOT NULL, " +
        " price DECIMAL(10,2) NOT NULL, " +
        " time INT(11) NOT NULL, " +
        " type VARCHAR(32) NOT NULL, " +
        " action VARCHAR(32) NOT NULL) ;";


    db.runSql(query, [], callback);
};

function down(db, callback) {
    return null;
};

module.exports.up = up;
module.exports.down = down;