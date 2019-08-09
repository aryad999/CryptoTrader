class OHLC {
    constructor(
        currencyPair,
        timeInterval,
        time,
        endtime,
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
        this.time = time;
        this.endtime = endtime;
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