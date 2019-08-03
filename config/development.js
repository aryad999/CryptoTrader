
module.exports = {
    mysql: {
        host: 'localhost',
        user: 'root',
        password: process.env.mysql_root_pass,
        database: process.env.mysql_database
    }
}