/**
 * Potential trade order that will be executed by the trade maker
 */
class TradeOrder {
    constructor(
        assetPair,
        action,
        type,
        volume
    ){
        this.assetPair = assetPair;
        this.action = action;
        this.type = type;
        this.volume = volume
    }
}