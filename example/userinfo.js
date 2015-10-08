var okcoin = require('..');

var apikey = "";
var secret = "";
var api = okcoin.createPrivateApi(apikey, secret, "okcoin/trade agent");
api.spot.userInfo().then(console.log)
