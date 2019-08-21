class Candlestick {
    constructor(
        endtime,
        open,
        high,
        low,
        close,
        volume
    ) {
        this.endtime = endtime;
        this.open = open;
        this.high = high;
        this.low = low;
        this.close = close;
        this.volume = volume;
    }
}

module.exports = Candlestick;