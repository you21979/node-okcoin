"use strict";
var crypto = require('crypto');
var querystring = require('querystring');
var constant = require('./constant');
var lp = require('./system').lp;
var objUtil = require('./obj_util');
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
    };
}
var createPostData = function(api_key, secret_key, params){
    var w = objUtil.sortObject(objUtil.mergeObject({
        api_key : api_key
    },params))
    var qstring = querystring.stringify(params);
    var res = objUtil.mergeObject(w, {sign:createSign('md5', secret_key, querystring.stringify(w))})
    return res;
}

var createPrivateApi = module.exports = function(api_key, secret_key, user_agent){
    var url = function(){ return constant.OPT_RESTAPI_URL };
    var query = function(method, params){
//        console.log(createPostOption(url(), api_key, secret_key, user_agent, method, params))
        return lp.req(createPostOption(url(), api_key, secret_key, user_agent, method, params)).
        then(JSON.parse).then(function(v){
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
