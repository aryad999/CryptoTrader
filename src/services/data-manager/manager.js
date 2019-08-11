const ohlcData = require('../market-data/models/ohlc-data');

ohlcData.getOHLCByTimestamp('24h', 1565195806)
    .then((data) => {
        console.log(data);
    })