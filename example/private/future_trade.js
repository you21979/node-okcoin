var okcoin = require('../..');
var fs = require("fs");

var CONFIG = JSON.parse(fs.readFileSync("./config.json", "utf8"));

var apikey = CONFIG.apikey;
var secret = CONFIG.secret;
var api = okcoin.createPrivateApi(apikey, secret, "okcoin/trade agent");
var FUTURE = okcoin.FutureConstant;


// real order TYPE : LONG    PRICE : 100    AMOUNT : 1
api.future.trade('btc_usd', FUTURE.CONTRACT_TYPE.THIS_WEEK, 100, 1, FUTURE.TRADE_TYPE.OPEN_LONG).then(function(res){
    return api.future.cancel('btc_usd', FUTURE.CONTRACT_TYPE.THIS_WEEK, res.order_id);
}).then(console.log)

