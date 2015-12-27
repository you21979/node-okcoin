var TRADE_TYPE = exports.TRADE_TYPE = {
    OPEN_LONG : 1,
    OPEN_SHORT : 2,
    CLOSE_LONG : 3,
    CLOSE_SHORT : 4,
}

var CONTRACT_TYPE = exports.CONTRACT_TYPE = {
    THIS_WEEK : 'this_week',
    NEXT_WEEK : 'next_week',
    QUARTER : 'quarter',
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

