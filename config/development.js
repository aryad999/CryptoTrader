
module.exports = {
    kraken: {
        api_key: process.env.kraken_api_key,
        secret_api_key: process.env.kraken_secret_api_key,
        api_url: process.env.kraken_api_url,
        api_version: process.env.kraken_api_version
    },
    mysql: {
        host: process.env.mysql_host,
        user: process.env.mysql_user,
        password: process.env.mysql_pass,
        database: process.env.mysql_database
    },
    risk:{
        default_order_volume: process.env.risk_default_order_volume
    }
}