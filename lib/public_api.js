"use strict";
var querystring = require('querystring');
var lp = require('./system').lp;
var constant = require('./constant');
var makeapi = function(api){
    return constant.OPT_RESTAPI_URL + '/' + api + '.do';
}
var createEndPoint = function(apiv1, qs){
    qs = (qs === '') ? qs : '?' + qs;
    return apiv1 + qs.toLowerCase();
}

var query = exports.query = function(method, qs){
    return lp.req(createEndPoint(makeapi(method), qs)).
        then(JSON.parse).
        then(function(result){
            if('error_code' in result) throw new Error(result.error);
            else return result;
        });
}

var spot = exports.spot = {};
spot.ticker = function(pair){
    return query('ticker', querystring.stringify({symbol:pair}));
}
spot.depth = function(pair){
    return query('depth', querystring.stringify({symbol:pair}));
}
spot.trades = function(pair){
    return query('trades', querystring.stringify({symbol:pair}));
}
spot.kline = function(pair,type,size,since){
    return query('kline', querystring.stringify({
        symbol:pair,
        type:type,
        size:size,
        since:since
    }));
}

spot.lendDepth = function(asset){
    return query('lend_depth', querystring.stringify({
        symbol:asset
    }));
}

var future = exports.future = {};
future.CONTRACT_TYPE = {
    THIS_WEEK : 'this_week',
    NEXT_WEEK : 'next_week',
    QUARTER : 'quarter',
}
future.ticker = function(pair, contract_type){
    return query('future_ticker', querystring.stringify({
        symbol:pair,
        contract_type:contract_type
    }));
}
future.depth = function(pair, contract_type){
    return query('future_depth', querystring.stringify({
        symbol:pair,
        contract_type:contract_type
    }));
}
future.trades = function(pair, contract_type){
    return query('future_trades', querystring.stringify({
        symbol:pair,
        contract_type:contract_type
    }));
}
future.index = function(pair){
    return query('future_index', querystring.stringify({
        symbol:pair,
    }));
}
future.exchangeRate = function(){
    return query('exchange_rate', '');
}
future.estimatedPrice = function(pair){
    return query('future_estimated_price', querystring.stringify({
        symbol:pair,
    }));
}
future.tradesHistory = function(pair,date,since){
    return query('future_trades_history', querystring.stringify({
        symbol:pair,
        date:date,
        since:since,
    }));
}
future.kline = function(pair, contract_type, type, size, since){
    return query('future_kline', querystring.stringify({
        symbol:pair,
        contract_type:contract_type,
        type:type,
        size:size,
        since:since,
    }));
}
future.hold_amount = function(pair, contract_type){
    return query('future_hold_amount', querystring.stringify({
        symbol:pair,
        contract_type:contract_type
    }));
}
future.explosive = function(pair, contract_type, status){
    return query('future_explosive', querystring.stringify({
        symbol:pair,
        contract_type:contract_type,
        status:status
    }));
}


