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
    var mcAddress = request.params.mcAddress;
    var mcGeo = request.params.mcGeo;
    var saleScope = request.params.saleScope;
    var businessHours = request.params.businessHours;
    var orderQuantity = request.params.orderQuantity;
    var sumDealMon = request.params.sumDealMon;
    var mcEncode = request.params.mcEncode;
    var mcAccount = request.params.mcAccount;
    var mcPassword = request.params.mcPassword;
    var mcOwner = request.params.mcOwner;
    var ownerPhone = request.params.ownerPhone;
    var mcStatus = request.params.mcStatus;
    var cmdyCount = request.params.cmdyCount;
    var selfCmdyCount = request.params.selfCmdyCount;
    var minCost = request.params.minCost;
    var mcGrade = request.params.mcGrade;


    //get a merchant
    var mc = new AV.User();
    mc.set('mcName',mcName);
    mc.set('username',mcAccount);
    mc.set('password',mcPassword);
    mc.set('mobilePhoneNumber',ownerPhone);
    mc.set('mcAddress',mcAddress);
    mc.set('mcGeo',mcGeo);
    mc.set('saleScope',saleScope);
    mc.set('businessHours',businessHours);
    mc.set('orderQuantity',orderQuantity);
    mc.set('sumDealMon',sumDealMon);
    mc.set('mcEncode',mcEncode);
    mc.set('mcOwner',mcOwner);
    mc.set('mcStatus',mcStatus);
    mc.set('cmdyCount',cmdyCount);
    mc.set('selfCmdyCount',selfCmdyCount);
    mc.set('minCost',minCost);
    mc.set('mcGrade',mcGeo);

    mc.signUp(null,{
        success:function(merchant){
            response.success(merchant);
        },
        error:function(object,error){
            response.error('error');
        }
    });

});