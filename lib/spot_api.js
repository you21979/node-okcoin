"use strict";

var SpotApi = function(api){
    this.api = api
}

SpotApi.prototype.userInfo = function(){
    return this.api.query('userinfo.do', {})
}
SpotApi.prototype.trade = function(symbol, type, price, amount){
    return this.api.query('trade.do', {
        symbol : symbol, type : type, price : price, amount : amount,
    })
}
SpotApi.prototype.tradeHistory = function(symbol, since){
    return this.api.query('tradeHistory.do', {
        symbol : symbol, since : since,
    })
}
SpotApi.prototype.batchTrade = function(symbol, type, orders_data){
    return this.api.query('batch_trade.do', {
        symbol : symbol, type : type, orders_data : orders_data,
    })
}
SpotApi.prototype.cancelOrder = function(symbol, order_id){
    return this.api.query('cancel_order.do', {
        symbol : symbol, order_id : order_id,
    })
}
SpotApi.prototype.orderInfo = function(symbol, order_id){
    return this.api.query('order_info.do', {
        symbol : symbol, order_id : order_id,
    })
}
SpotApi.prototype.ordersInfo = function(type, symbol, order_id){
    return this.api.query('orders_info.do', {
        type : type, symbol : symbol, order_id : order_id,
    })
}
SpotApi.prototype.orderHistory = function(symbol, status, current_page, page_length){
    return this.api.query('order_history.do', {
        symbol : symbol, status : status, current_page : current_page, page_length : page_length,
    })
}
SpotApi.prototype.withdraw = function(symbol, chargefee, trade_pwd, withdraw_address, withdraw_amount){
    return this.api.query('withdraw.do', {
        symbol : symbol, chargefee : chargefee, trade_pwd : trade_pwd, withdraw_address : withdraw_address, withdraw_amount : withdraw_amount,
    })
}
SpotApi.prototype.cancelWithdraw = function(symbol, withdraw_id){
    return this.api.query('cancel_withdraw.do', {
        symbol : symbol, withdraw_id : withdraw_id,
    })
}
SpotApi.prototype.cancel_withdraw = SpotApi.prototype.cancelWithdraw; // next version deprecated

var createSpotApi = module.exports = function(api){
    return new SpotApi(api)
}

