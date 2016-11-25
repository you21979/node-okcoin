"use strict";
var crypto = require('crypto');
var querystring = require('querystring');
var objectutil = require('@you21979/object-util');
var HttpApiError = require('@you21979/http-api-error');
var constant = require('./constant');
var lp = require('./system').lp;
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
var createPostOption = function(url, api_key, secret_key, user_agent, timeout, method, params){
    return {
        url: url + '/' + method,
        method: 'POST',
        form: createPostData(api_key, secret_key, params),
        headers: createHeader(user_agent),
        timeout : timeout,
        transform2xxOnly: true,
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


var TradeApi = function(api_key, secret_key, user_agent){
    this.name = 'OKCOIN';
    this.url = constant.OPT_RESTAPI_URL;
    this.timeout = Math.floor(constant.OPT_TIMEOUT_SEC * 1000);
    this.api_key = api_key;
    this.secret_key = secret_key;
    this.user_agent = user_agent;

    this.spot = createSpotApi(this);
    this.future = createFutureApi(this);
}

TradeApi.prototype.query = function(method, mustparams, options){
    var params = objectutil.keyMerge(mustparams, options);
    return lp.req(createPostOption(this.url, this.api_key, this.secret_key, this.user_agent, this.timeout, method, params)).
        then(function(v){
            if(v.result === true){
                return v;
            }else{
                throw new HttpApiError(v.error_code + ':' + constant.ERROR_CODE_MSG[v.error_code], "API", v.error_code, v);
            }
        });
}

var createPrivateApi = module.exports = function(api_key, secret_key, user_agent){
    return new TradeApi(api_key, secret_key, user_agent);
}
