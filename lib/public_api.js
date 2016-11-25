"use strict";
var qstring = require('querystring');
var objectutil = require('@you21979/object-util');
var HttpApiError = require('@you21979/http-api-error');
var lp = require('./system').lp;
var constant = require('./constant');

var createGetOption = function(method, params, options){
    return {
        url : createEndPoint(method),
        qs : createParameter(params, options || {}),
        timeout : Math.floor(constant.OPT_TIMEOUT_SEC * 1000),
        transform2xxOnly: true,
        transform: function(body){
            return JSON.parse(body)
        },
    }
}

var createEndPoint = function(method){
    return constant.OPT_RESTAPI_URL + '/' + method + '.do';
}

var createParameter = function(params, options){
    return objectutil.keyMerge(params, options)
}

var query = exports.query = function(method, params, options){
    return lp.req(createGetOption(method, params, options || {})).
        then(function(result){
            if('error_code' in result){
                throw new HttpApiError(result.error_code + ':' + constant.ERROR_CODE_MSG[result.error_code], "API", result.error_code, result);
            }else{
                return result;
            }
        });
}

var spot = exports.spot = {};
spot.ticker = function(pair){
    return query('ticker', {
        symbol:pair
    });
}

spot.depth = function(pair, size, merge){
    return query('depth', {
        symbol:pair,
        size:size ? size : 5,
        merge:merge ? merge : 0,
    });
}

spot.trades = function(pair){
    return query('trades', {
        symbol:pair
    });
}

spot.kline = function(pair, type, size, since){
    return query('kline', {
        symbol : pair,
        type : type,
        size : size,
        since : since
    });
}

spot.lendDepth = function(asset){
    return query('lend_depth', {
        symbol : asset
    });
}

var future = exports.future = {};
future.CONTRACT_TYPE = {
    THIS_WEEK : 'this_week',
    NEXT_WEEK : 'next_week',
    QUARTER : 'quarter',
}

future.ticker = function(pair, contract_type){
    return query('future_ticker', {
        symbol : pair,
        contract_type : contract_type
    });
}

future.depth = function(pair, contract_type, size, merge){
    return query('future_depth', {
        symbol : pair,
        contract_type : contract_type,
        size : size ? size : 5,
        merge : merge ? merge : 0,
    });
}

future.trades = function(pair, contract_type){
    return query('future_trades', {
        symbol : pair,
        contract_type : contract_type
    });
}

future.index = function(pair){
    return query('future_index', {
        symbol : pair,
    });
}

future.exchangeRate = function(){
    return query('exchange_rate', {
    });
}

future.estimatedPrice = function(pair){
    return query('future_estimated_price', {
        symbol : pair,
    });
}

future.tradesHistory = function(pair, date, since){
    return query('future_trades_history', {
        symbol : pair,
        date : date,
        since : since,
    });
}

future.kline = function(pair, contract_type, type, size, since){
    return query('future_kline', {
        symbol : pair,
        contract_type : contract_type,
        type : type,
        size : size,
        since : since,
    });
}

future.holdAmount = function(pair, contract_type){
    return query('future_hold_amount', {
        symbol : pair,
        contract_type : contract_type
    });
}

future.explosive = function(pair, contract_type, status, current_page, page_length){
    return query('future_explosive', {
        symbol : pair,
        contract_type : contract_type,
        status : status,
        current_page : current_page,
        page_length : page_length,
    });
}

future.future_price_limit = function(pair, contract_type){
    return query('future_price_limit', {
        symbol : pair,
        contract_type : contract_type,
    });
}


