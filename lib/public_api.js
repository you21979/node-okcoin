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


