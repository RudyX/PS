/**
 * Created by TimLi on 15/8/22.
 */

var http = require("http");
var fs = require('fs');
var AV = require('leanengine');
var querystring = require('querystring');


//var McCmdy = AV.Object.extend('Mc'+mcId+'Cmdy');







AV.Cloud.define('mcAddCmdy',function(request,response){
    var price = request.params.price;
    var isDiscount = request.params.isDiscount;//boolean
    var disPrice = request.params.disPrice;
    var repertory = request.params.repertory;

    var cmdycode = request.params.cmdycode;
    var cmdycode = '1234567890';

    var mcId = request.params.mcId;
    var mcId = 'SH00001';

    var query = new AV.Query('tCommodity');

    query.equalTo('cmdycode',cmdycode);
    query.first({
        success:function(data){
            //console.log('success');
            //global
            var mcTableName = 'Mc'+mcId+'Cmdy';


            // set data
            var McCmdy = AV.Object.extend(mcTableName);
            var mcCmdy = new McCmdy();
            mcCmdy.set('price',price);
            mcCmdy.set('isDiscount',isDiscount);
            mcCmdy.set('disPrice',disPrice);
            mcCmdy.set('repertory',repertory);
            mcCmdy.set('cmdycode',cmdycode);
            mcCmdy.set('manufname',data.get('manfname'));
            mcCmdy.set('barcode',data.get('barcode'));
            mcCmdy.set('pictures',data.get('pictures'));
            mcCmdy.set('class',data.get('class'));
            mcCmdy.set('cmdyname',data.get('cmdyname'));
            mcCmdy.set('trademark',data.get('trademark'));
            mcCmdy.set('specification',data.get('specification'));


            mcCmdy.save(null,{
                success:function(data){
                    response.success(data);
                },
                error:function(data,err){
                    response.error(err);
                }
            });



        },
        error:function(object,error){
            console.log('error:');
            console.log(error);
            response.error(error);
        }
    });


    //query.get('55d855fee4b0db80a572c44e',{
    //    success:function(data){
    //        console.log('success!');
    //        console.log(data);
    //        response.success(data);
    //
    //
    //
    //
    //
    //    },
    //    error:function(object,error){
    //        console.log('error:');
    //        console.log(error);
    //        response.error(error);
    //    }
    //
    //});



});





