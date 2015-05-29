var okcoin = require('..');
var future = okcoin.PublicApi.future;
future.depth('btc_usd', future.CONTRACT_TYPE.THIS_WEEK,10,1).then(console.log)
