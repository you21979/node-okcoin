"use strict";
var crypto = require('crypto');
var querystring = require('querystring');
var constant = require('./constant');
var lp = require('./system').lp;
var objectutil = require('@you21979/object-util');
var createSpotApi = require('./spot_api');
var createFutureApi = require('./future_api');

var createSign = function(argo, key, qstring){
    return crypto.createHash(argo).
        update(new Buffer(qstring + '&secret_key=' + key)).
        digest('hex').toString().toUpperCase();
};
var createHeader = function(user_agent){
    return {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': user_agent,
    };
}
var createPostOption = function(url, api_key, secret_key, user_agent, method, params){
    return {
        url: [url, method].join('/'),
        method: 'POST',
        form: createPostData(api_key, secret_key, params),
        headers: createHeader(user_agent),
        timeout : Math.floor(constant.OPT_TIMEOUT_SEC * 1000),
        transform: function(body){
            return JSON.parse(body)
        },
    };
}
var createPostData = function(api_key, secret_key, params){
    var w = objectutil.keyMerge({
        api_key : api_key
    },params)
    var qs = querystring.stringify(w).split('&').sort().join('&');
    var res = objectutil.keyMerge(w, {sign:createSign('md5', secret_key, qs)})
    return res;
}

var createPrivateApi = module.exports = function(api_key, secret_key, user_agent){
    var url = function(){ return constant.OPT_RESTAPI_URL };
    var query = function(method, params){
//        console.log(createPostOption(url(), api_key, secret_key, user_agent, method, params))
        return lp.req(createPostOption(url(), api_key, secret_key, user_agent, method, params)).
            then(function(v){
                if(v.result === true) return v;
                else throw(new Error(v.error_code + ':' + constant.ERROR_CODE_MSG[v.error_code]));
            });
    };
    return {
        query : query,
        spot : createSpotApi(query),
        future : createFutureApi(query),
    };
}
