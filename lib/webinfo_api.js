"use strict";
var querystring = require('querystring');
var lp = require('./system').lp;
var constant = require('./constant');

var createEndPoint = function(apiv1, qs){
    qs = (qs === '') ? qs : '?' + qs;
    return apiv1 + qs.toLowerCase();
}

var createGetOption = function(url){
    return {
        url : url,
        timeout : Math.floor(constant.OPT_TIMEOUT_SEC * 1000),
        transform: function(body){
            return JSON.parse(body)
        },
    }
}

var getFuturePositionRatio = exports.getFuturePositionRatio = function(symbol, type){
    var qs = {
        symbol : symbol || 0,
        type : type || 0,
    }
    return lp.req(createGetOption(createEndPoint('https://www.okcoin.com/future/getFuturePositionRatio.do', querystring.stringify(qs))))
}
var getEliteScale = exports.getEliteScale = function(symbol, type){
    var qs = {
        symbol : symbol || 0,
        type : type || 0,
    }
    return lp.req(createGetOption(createEndPoint('https://www.okcoin.com/future/eliteScale.do', querystring.stringify(qs))))
}
var getFutureVolume = exports.getFutureVolume = function(symbol, type){
    var qs = {
        symbol : symbol || 0,
        typesum : type || 1,
    }
    return lp.req(createGetOption(createEndPoint('https://www.okcoin.com/future/futureVolume.do', querystring.stringify(qs))))
}

