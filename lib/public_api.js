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

var createGetOption = function(url){
    return {
        url : url,
        timeout : Math.floor(constant.OPT_TIMEOUT_SEC * 1000),
    }
}

var query = exports.query = function(method, qs){
    return lp.req(createGetOption(createEndPoint(makeapi(method), qs))).
        then(JSON.parse).
        then(function(result){
            if('error_code' in result) throw new Error(result.error_code + ':' + constant.ERROR_CODE_MSG[result.error_code]);
            else return result;
        });
}

var spot = exports.spot = {};
spot.ticker = function(pair){
    return query('ticker', querystring.stringify({symbol:pair}));
}
spot.depth = function(pair,size,merge){
    return query('depth', querystring.stringify({
        symbol:pair,
        size:size ? size : 5,
        merge:merge ? merge : 0,
    }));
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
future.depth = function(pair, contract_type, size, merge){
    return query('future_depth', querystring.stringify({
        symbol:pair,
        contract_type:contract_type,
        size:size ? size : 5,
        merge:merge ? merge : 0,
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
future.holdAmount = function(pair, contract_type){
    return query('future_hold_amount', querystring.stringify({
        symbol:pair,
        contract_type:contract_type
    }));
}
future.explosive = function(pair, contract_type, status, current_page, page_length){
    return query('future_explosive', querystring.stringify({
        symbol:pair,
        contract_type:contract_type,
        status:status,
        current_page:current_page,
        page_length:page_length,
    }));
}
future.future_price_limit = function(pair, contract_type){
    return query('future_price_limit', querystring.stringify({
        symbol:pair,
        contract_type:contract_type,
    }));
}


