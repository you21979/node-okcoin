"use strict";
var mergeObject = exports.mergeObject = function(object1, object2){
    var resobj = {};
    Object.keys(object1).forEach(function(key){
        resobj[key] = object1[key];
    })
    Object.keys(object2).forEach(function(key){
        resobj[key] = object2[key];
    })
    return resobj;
}

