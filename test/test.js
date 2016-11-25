'use strict';
var assert = require('power-assert');
var les = require("local-echoserver");
var qstring = require("querystring");
var Promise = require("bluebird");
var okc = require('..');

describe('test', function () {
    describe('private api test', function () {
        var constant = okc.Constant;
        var config = {apikey : "",secretkey : "", useragent : "tradebot"}
        it('userInfo and auth', function () {
            return les(function(url){
                constant.OPT_RESTAPI_URL = url + '/api/v1'
                var papi = okc.createPrivateApi(config.apikey, config.secretkey, config.useragent);
                return papi.spot.userInfo()
            }, function(res, headers, method, url, body){
                assert(method === 'POST');
                assert(headers['user-agent'] === config.useragent)
                var result = JSON.stringify({
                    result : true,
                });
                res.end(result);
            })
        })
    })
    describe('public spot api test', function () {
        var constant = okc.Constant;
        var api = okc.PublicApi;
        it('depth', function () {
            return les(function(url){
                constant.OPT_RESTAPI_URL = url + '/api/v1'
                return api.spot.depth('btc_usd', 10)
            }, function(res, headers, method, url, body){
                assert(method === 'GET');
                assert(url === '/api/v1/depth.do?symbol=btc_usd&size=10&merge=0');
                var result = JSON.stringify({
                    "result" : true,
                });
                res.end(result);
            })
        })
        it('ticker', function () {
            return les(function(url){
                constant.OPT_RESTAPI_URL = url + '/api/v1'
                return api.spot.ticker('btc_usd')
            }, function(res, headers, method, url, body){
                assert(method === 'GET');
                assert(url === '/api/v1/ticker.do?symbol=btc_usd');
                var result = JSON.stringify({
                    "result" : true,
                });
                res.end(result);
            })
        })
    })
    describe('public future api test', function () {
        var constant = okc.Constant;
        var api = okc.PublicApi;
        it('depth', function () {
            return les(function(url){
                constant.OPT_RESTAPI_URL = url + '/api/v1'
                return api.future.depth('btc_usd', api.future.CONTRACT_TYPE.THIS_WEEK,10,1);
            }, function(res, headers, method, url, body){
                assert(method === 'GET');
                assert(url === '/api/v1/future_depth.do?symbol=btc_usd&contract_type=this_week&size=10&merge=1');
                var result = JSON.stringify({
                    "result" : true,
                });
                res.end(result);
            })
        })
        it('ticker', function () {
            return les(function(url){
                constant.OPT_RESTAPI_URL = url + '/api/v1'
                return api.future.ticker('btc_usd', api.future.CONTRACT_TYPE.THIS_WEEK)
            }, function(res, headers, method, url, body){
                assert(method === 'GET');
                assert(url === '/api/v1/future_ticker.do?symbol=btc_usd&contract_type=this_week');
                var result = JSON.stringify({
                    "result" : true,
                });
                res.end(result);
            })
        })
    })
})
