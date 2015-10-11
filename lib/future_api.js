"use strict";
var createFutureApi = module.exports = function(query){
    return {
        userInfo : function(){
            return query('future_userinfo.do', {})
        },
    }
}
