
var TRADE_TYPE = exports.TRADE_TYPE = {
    BUY : 'buy',
    SELL : 'sell',
    BUY_MARKET : 'buy_market',
    SELL_MARKET : 'sell_market',
}

var QUERY_ORDER_STATUS = exports.QUERY_ORDER_STATUS = {
    UNFILLED : 1,
    FILLED : 2,
}

var RESULT_ORDER_STATUS = exports.RESULT_ORDER_STATUS = {
    CANCELLED : -1, // expire 2hour ?
    UNFILLED : 0,
    PARTIALLY_FILLED : 1,
    FULLY_FILLED : 2,
    CANCEL : 4,
}

