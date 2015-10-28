var okcoin = require('..');
var fs = require("fs");

var CONFIG = JSON.parse(fs.readFileSync("./config.json", "utf8"));

var apikey = CONFIG.apikey;
var secret = CONFIG.secret;
var api = okcoin.createPrivateApi(apikey, secret, "okcoin/trade agent");
api.spot.userInfo().then(console.log)
api.future.userInfo().then(console.log)

