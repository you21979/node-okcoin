var okcoin = require('../..');
var fs = require("fs");
var Promise = require('bluebird')

var CONFIG = JSON.parse(fs.readFileSync("./config.json", "utf8"));

var apikey = CONFIG.apikey;
var secret = CONFIG.secret;
var api = okcoin.createPrivateApi(apikey, secret, "okcoin/trade agent");

var FUTURE = okcoin.FutureConstant;

var Trade = function(api, symbol, contract){
    this.api = api
    this.contract = contract
    this.symbol = symbol
}

Trade.prototype.orderInfo = function(state){
    return api.future.orderInfo(this.symbol, this.contract, state )
}

var thisweek = new Trade(api, 'btc_usd', FUTURE.CONTRACT_TYPE.THIS_WEEK)
var nextweek = new Trade(api, 'btc_usd', FUTURE.CONTRACT_TYPE.NEXT_WEEK)
var quarter = new Trade(api, 'btc_usd', FUTURE.CONTRACT_TYPE.QUARTER)


Promise.all([
 thisweek.orderInfo(FUTURE.QUERY_ORDER_STATUS.UNFILLED),
 nextweek.orderInfo(FUTURE.QUERY_ORDER_STATUS.UNFILLED),
 quarter.orderInfo(FUTURE.QUERY_ORDER_STATUS.UNFILLED)
]).spread(console.log)

