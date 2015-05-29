"use strict";
var constant = require('./constant');
var WebSocket = require('ws');

var createStreamApi = module.exports = function(){
    var instance = {
        debuglog : console.log
    }
    var uri = constant.OPT_WEBSOCKET_URL;
    var ws = new WebSocket(uri);
    ws.on('open', function(){
        instance.debuglog(['opened', uri]);
    });
    ws.on('error', function(){
        instance.debuglog(['error', uri]);
    });
    ws.on('close', function(){
        instance.debuglog(['closed', uri]);
    })
    ws.on('message', function(data, flags) {
        if(flags.binary){
            instance.debuglog(['recv', 'binary']);
        }else{
            instance.debuglog(['recv', 'string']);
            var w = {}
            try{
                w = JSON.parse(data);
            }catch(e){
                instance.debuglog(['exception', 'JSON.parse', data]);
                return;
            }
            try{
                receiver(w);
            }catch(e){
                instance.debuglog(['exception', 'receiver', data]);
                return;
            }
        }
    });
    instance.close = function(){
        ws.close();
    }
    return instance;
}

