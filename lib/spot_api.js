"use strict";
var createSpotApi = module.exports = function(query){
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
