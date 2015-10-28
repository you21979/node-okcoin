var okcoin = require('../..');
var future = okcoin.PublicApi.future;
future.ticker('btc_usd', future.CONTRACT_TYPE.THIS_WEEK).then(console.log)
