
module.exports = {
    kraken: {
        api_key: process.env.kraken_api_key,
        secret_api_key = process.env.kraken_secret_api_key
    },
    mysql: {
        host: process.env.mysql_host,
        user: process.env.mysql_user,
        password: process.env.mysql_pass,
        database: process.env.mysql_database
    }
}