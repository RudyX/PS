/**
 * Created by TimLi on 15/8/22.
 */
var http = require("http");
var fs = require('fs');
var AV = require('leanengine');
var querystring = require('querystring');


AV.Cloud.define('addCenterCmdy',function(request,response){

    var centerCmdy = new CenterCmdy();
    var cmdyName = request.params.cmdyName;
    var classId = request.params.classId;
    var trademark = request.params.trademark;
    var barcode = request.params.barcode;
    var specification = request.params.specification;
    var cmdyEncode = request.params.cmdyEncode;



});

AV.Cloud.define('addMerchant',function(request,response){
    var mcName = request.params.mcName;
    var mcAddress = resquest.param.mcAddress;
    var mcGeo = request.params.mcGeo;
    var saleScope = request.params.sale.Scope;
    

});