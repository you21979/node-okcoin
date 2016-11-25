"use strict";
var Promise = require("bluebird");
var ThrowError = function(err){
    return Promise.reject(err)
}

var FutureApi = function(api){
    this.api = api
}

FutureApi.prototype.userInfo = function(){
    return this.api.query('future_userinfo.do', {})
}

FutureApi.prototype.position = function(symbol, contract_type){
    return this.api.query('future_position.do', {
        symbol : symbol,
        contract_type : contract_type,
    })
}

FutureApi.prototype.trade = function(symbol, contract_type, price, amount, type, lever_rate){
    lever_rate = lever_rate || 10;
    return this.api.query('future_trade.do', {
        symbol : symbol,
        contract_type : contract_type,
        price : price,
        amount : amount,
        type : type,
        match_price : 0,
        lever_rate : lever_rate,
    })
}
FutureApi.prototype.tradesHistory = function(symbol, date, since){
    return this.api.query('future_trades_history.do', {
        symbol : symbol,
        date : date,
        since : since,
    })
}
FutureApi.prototype.batchTrade = function(symbol, contract_type, orders_data, lever_rate){
    lever_rate = lever_rate || 10;
    if(!(orders_data instanceof Array)) return ThrowError(new Error("orders_data must be array"));
    var chk = orders_data.map(function(v){
        return v.price && v.amount && v.type
    }).filter(function(v){ return v === false }).length;
    if(chk) return ThrowError(new Error("orders_data is invalid"));
    return this.api.query('future_batch_trade.do', {
        symbol : symbol,
        contract_type : contract_type,
        orders_data : JSON.stringify(orders_data),
        lever_rate : lever_rate,
    })
}
FutureApi.prototype.cancel = function(symbol, contract_type, order_id){
    return this.api.query('future_cancel.do', {
        symbol : symbol,
        contract_type : contract_type,
        order_id : order_id,
    })
}
FutureApi.prototype.orderInfo = function(symbol, contract_type, status, order_id, current_page, page_length){
    order_id = order_id || -1;
    current_page = current_page || 0;
    page_length = page_length || 50;
    return this.api.query('future_order_info.do', {
        symbol : symbol,
        contract_type : contract_type,
        status : status,
        order_id : order_id,
        current_page : current_page,
        page_length : page_length,
    })
}
FutureApi.prototype.ordersInfo = function(symbol, contract_type, order_id){
    return this.api.query('future_orders_info.do', {
        symbol : symbol,
        contract_type : contract_type,
        order_id : order_id,
    })
}
FutureApi.prototype.userinfo4fix = function(){
    return this.api.query('future_userinfo_4fix.do', {})
}

FutureApi.prototype.position4fix = function(symbol, contract_type, type){
    return this.api.query('future_position_4fix.do', {
        symbol : symbol,
        contract_type : contract_type,
        type : type,
    })
}
FutureApi.prototype.explosive = function(symbol, contract_type, status, current_page, page_length){
    page_length = page_length || 50;
    return this.api.query('future_explosive.do', {
        symbol : symbol,
        contract_type : contract_type,
        status : status,
        current_page : current_page,
        page_length : page_length,
    })
}
FutureApi.prototype.devolve = function(symbol, type, amount){
    return this.api.query('future_devolve.do', {
        symbol : symbol,
        type : type,
        amount : amount,
    })
}

var createFutureApi = module.exports = function(api){
    return new FutureApi(api);
}

