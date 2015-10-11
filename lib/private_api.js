"use strict";
var crypto = require('crypto');
var querystring = require('querystring');
var constant = require('./constant');
var lp = require('./system').lp;
var objUtil = require('./obj_util');

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

var createSpotApi = function(query){
    return {
        userInfo : function(){
            return query('userinfo.do', {})
        },
        trade : function(symbol, type, price, amount){
            return query('trade.do', {
                symbol : symbol, type : type, price : price, amount : amount,
            })
        },
        tradeHistory : function(symbol, since){
            return query('tradeHistory.do', {
                symbol : symbol, since : since,
            })
        },
        batchTrade : function(symbol, type, orders_data){
            return query('batch_trade.do', {
                symbol : symbol, type : type, orders_data : orders_data,
            })
        },
        cancelOrder : function(symbol, order_id){
            return query('cancel_order.do', {
                symbol : symbol, order_id : order_id,
            })
        },
        orderInfo : function(symbol, order_id){
            return query('order_info.do', {
                symbol : symbol, order_id : order_id,
            })
        },
        ordersInfo : function(type, symbol, order_id){
            return query('orders_info.do', {
                type : type, symbol : symbol, order_id : order_id,
            })
        },
        orderHistory : function(symbol, status, current_page, page_length){
            return query('order_history.do', {
                symbol : symbol, status : status, current_page : current_page, page_length : page_length,
            })
        },
        withdraw : function(symbol, chargefee, trade_pwd, withdraw_address, withdraw_amount){
            return query('withdraw.do', {
                symbol : symbol, chargefee : chargefee, trade_pwd : trade_pwd, withdraw_address : withdraw_address, withdraw_amount : withdraw_amount,
            })
        },
        cancel_withdraw : function(symbol, withdraw_id){
            return query('cancel_withdraw.do', {
                symbol : symbol, withdraw_id : withdraw_id,
            })
        },
    }
}
var createFutureApi = function(query){
    return {
        userInfo : function(){
            return query('future_userinfo.do', {})
        },
    }
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
