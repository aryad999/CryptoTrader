/**
 * Potential trade order that will be executed by the trade maker
 */
class TradeOrder {
    candleTime;
    constructor(
        currencyPair,
        action,
        type,
        volume
    ){
        this.currencyPair = currencyPair;
        this.action = action;
        this.type = type;
        this.volume = volume
    }
}

module.exports = TradeOrder;