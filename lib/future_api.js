"use strict";
var Promise = require("bluebird");
var ThrowError = function(err){
    return Promise.reject(err)
}
var createFutureApi = module.exports = function(query){
    return {
        userInfo : function(){
            return query('future_userinfo.do', {})
        },
        position : function(symbol, contract_type){
            return query('future_position.do', {
                symbol : symbol,
                contract_type : contract_type,
            })
        },
        trade : function(symbol, contract_type, price, amount, type, lever_rate){
            lever_rate = lever_rate || 10;
            return query('future_trade.do', {
                symbol : symbol,
                contract_type : contract_type,
                price : price,
                amount : amount,
                type : type,
                match_price : 0,
                lever_rate : lever_rate,
            })
        },
        tradesHistory : function(symbol, date, since){
            return query('future_trades_history.do', {
                symbol : symbol,
                date : date,
                since : since,
            })
        },
        batchTrade : function(symbol, contract_type, orders_data, lever_rate){
            lever_rate = lever_rate || 10;
            if(!(orders_data instanceof Array)) return ThrowError(new Error("orders_data must be array"));
            var chk = orders_data.map(function(v){
                return v.price && v.amount && v.type
            }).filter(function(v){ return v === false }).length;
            if(chk) return ThrowError(new Error("orders_data is invalid"));
            return query('future_batch_trade.do', {
                symbol : symbol,
                contract_type : contract_type,
                orders_data : JSON.stringify(orders_data),
                lever_rate : lever_rate,
            })
        },
        cancel : function(symbol, contract_type, order_id){
            return query('future_cancel.do', {
                symbol : symbol,
                contract_type : contract_type,
                order_id : order_id,
            })
        },
        orderInfo : function(symbol, contract_type, status, order_id, current_page, page_length){
            order_id = order_id || -1;
            current_page = current_page || 0;
            page_length = page_length || 50;
            return query('future_order_info.do', {
                symbol : symbol,
                contract_type : contract_type,
                status : status,
                order_id : order_id,
                current_page : current_page,
                page_length : page_length,
            })
        },
        ordersInfo : function(symbol, contract_type, order_id){
            return query('future_orders_info.do', {
                symbol : symbol,
                contract_type : contract_type,
                order_id : order_id,
            })
        },
        userinfo4fix : function(){
            return query('future_userinfo_4fix.do', {})
        },
        position4fix : function(symbol, contract_type, type){
            return query('future_position_4fix.do', {
                symbol : symbol,
                contract_type : contract_type,
                type : type,
            })
        },
        explosive : function(symbol, contract_type, status, current_page, page_length){
            page_length = page_length || 50;
            return query('future_explosive.do', {
                symbol : symbol,
                contract_type : contract_type,
                status : status,
                current_page : current_page,
                page_length : page_length,
            })
        },

    }
}
