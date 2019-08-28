class OHLC {
    constructor(
        currencyPair,
        timeInterval,
        updated_time,
        time,
        open,
        high,
        low,
        close,
        vwap,
        volume,
        count
    ) {
        this.currencyPair = currencyPair;
        this.timeInterval = timeInterval;
        this.updated_time = updated_time;
        this.time = time;
        this.open = open;
        this.high = high;
        this.low = low;
        this.close = close;
        this.vwap = vwap;
        this.volume = volume;
        this.count = count;

    }

    
}


module.exports = OHLC;