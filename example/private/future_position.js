var okcoin = require('..');
var fs = require("fs");

var CONFIG = JSON.parse(fs.readFileSync("./config.json", "utf8"));

var apikey = CONFIG.apikey;
var secret = CONFIG.secret;
var api = okcoin.createPrivateApi(apikey, secret, "okcoin/trade agent");
api.future.position('btc_usd', 'this_week').then(console.log)

