"use strict";
var crypto = require('crypto');
var querystring = require('querystring');
var constant = require('./constant');
var lp = require('./system').lp;

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
var mergeObject = function(object1, object2){
    var resobj = {};
    Object.keys(object1).forEach(function(key){
        resobj[key] = object1[key];
    })
    Object.keys(object2).forEach(function(key){
        resobj[key] = object2[key];
    })
    return resobj;
}
var sortObject = function(obj){
    var resobj = {};
    Object.keys(obj).sort().forEach(function(key){
        resobj[key] = obj[key];
    })
    return resobj;
}
var createPostData = function(api_key, secret_key, params){
    var w = sortObject(mergeObject({
        api_key : api_key
    },params))
    var qstring = querystring.stringify(params);
    var res = mergeObject(w, {sign:createSign('md5', secret_key, querystring.stringify(w))})
    return res;
}
var createPrivateApi = module.exports = function(api_key, secret_key, user_agent){
    var url = function(){ return constant.OPT_RESTAPI_URL };
    var query = function(method, params){
        console.log(createPostOption(url(), api_key, secret_key, user_agent, method, params))
        return lp.req(createPostOption(url(), api_key, secret_key, user_agent, method, params)).
        then(JSON.parse).then(function(v){
            if(v.result === true) return v;
            else throw(new Error(v.error_code));
        });
    };
    return {
        query : query,
        spot : {
            userInfo : function(){ return query('userinfo.do', {}) },
        },
        future : {
            userInfo : function(){ return query('future_userinfo.do', {}) },
        },
    };
}
