/**
 * Created by TimLi on 15/8/22.
 */


var http = require("http");
var fs = require('fs');
var AV = require('leanengine');
var querystring = require('querystring');
var self = require('./toolsModule');





//添加一个商品
AV.Cloud.define('mcAddCmdy',function(request,response){
    /*
    if(!request.user.get('mcEncode')){
        response.error({code:1501,message:"只有登陆了的商户才可以调用该函数(user.mcEncode为空)"});
    }
    */
    var barcode = request.params.barcode;
    var price = request.params.price;//int
    var isDiscount = request.params.isDiscount;//boolean
    var disPrice = request.params.disPrice;
    var repertory = request.params.repertory;//int
    var pdtionDate = request.params.pdtionDate;//date
    var deadline = request.params.deadline;//date
    var manufacturer = request.params.manufacturer;
    var origin = request.params.origin;
    var description = request.params.description


    var mcEncode = request.user.get('mcEncode');
    //var mcEncode = 'SH00001';

    var query = new AV.Query('tCommodity');

    query.equalTo('barcode',barcode);
    query.first({
        success:function(data){
            //console.log('success');
            //global
            var mcTableName = 'Mc'+mcEncode+'Cmdy';
            // set data
            var McCmdy = AV.Object.extend(mcTableName);
            var mcCmdy = new McCmdy();
            mcCmdy.set('price',price);
            mcCmdy.set('isDiscount',isDiscount);
            mcCmdy.set('disPrice',disPrice);
            mcCmdy.set('repertory',repertory);
            mcCmdy.set('pdtionDate',pdtionDate);
            mcCmdy.set('deadline',deadline);
            mcCmdy.set('manufacturer',manufacturer);
            mcCmdy.set('origin',origin);
            mcCmdy.set('description',description);

            mcCmdy.set('barcode',barcode);
            mcCmdy.set('cmdyname',data.get('cmdyname'));
            mcCmdy.set('classId',data.get('classId'));
            mcCmdy.set('trademark',data.get('trademark'));
            mcCmdy.set('specification',data.get('specification'));
            mcCmdy.set('cmdyEncode',data.get('cmdyEncode'));
            mcCmdy.set('manufname',data.get('manfname'));


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
});


//将商品设置成特价
AV.Cloud.define('mcSetDisCmdy',function(request,response){
    if(!request.user.get('mcEncode')){
        response.error({code:1501,message:"只有登陆了的商户才可以调用该函数(user.mcEncode为空)"});
    }

    var cmdyEncode = request.params.cmdyEncode;
    var disPrice = request.param.disPrice;

    var mcEncode = request.user.get('mcEncode');
    var mcCmdyTable = 'Mc'+mcEncode+'Cmdy';


    var query = new AV.Query(mcCmdyTable);

    query.equalTo('cmdyEncode',cmdyEncode);
    query.greaterThan('isDiscount',false);
    query.first({
        success:function(data){
            data.set('isDiscount',true);
            data.set('disPrice',disPrice);
            data.save(null,{
                success:function(savedData){
                    response.success(savedData);
                },
                error:function(object,error){
                    response.error(error);
                }
            });
        },
        error:function(object,error){
            response.error(error);
        }
    });

});



//获得订单列表
AV.Cloud.define('mcGetOrdersList',function(request,response){
    var limit = request.params.limit;
    var skip = request.params.skip;
    var mcEncode = request.params.mcEncode;
    var status = request.params.status;


    var query = new AV.Query('orders');
    if(limit){
        query.limit(limit);
    }
    if(skip){
        query.skip(skip);
    }

    query.equalTo('mcEncode',mcEncode);
    query.equalTo('status',status);

    query.find({
        success:function(result){
            response.success(result);
        },
        error:function(error){
            response.errpr(error);
        }
    });




});



//获得商品列表
AV.Cloud.define('mcGetCmdyList',function(request,response){
    var mcEncode = request.params.mcEncode;
    var limit = request.params.limit;
    var skip = request.params.skip;
    var status = request.params.status;

    var query = new AV.Query(self.tools.getMcCmdyTable(mcEncode));

    switch(status){
        case 'onSale':
            query.greaterThan('stock',0);
            break;
        case 'saleOff':
            query.equalTo('stock',0);
            break;
        case 'discount':
            query.equalTo('isDiscount',false);
            break;
    }

    if(limit){
        query.limit(limit);
    }
    if(skip){
        query.skip(skip);
    }

    query.count({
        success:function(count){
            query.find({
                success:function(result){
                    console.log('------- result ----------');
                    console.log(result)
                    if(result.length > 0){
                       // result.set('count',count);
                    }

                    response.success(result);

                },
                error:function(error){
                    response.error(error);
                }
            });
        },
        error:function(error){
            response.error(error)
        }

    });
});



//修改库存
AV.Cloud.define('mcSetCmdyStock',function(request,response){
    var mcEncode = request.params.mcEncode;
    var cmdyEncode = request.params.cmdyEncode;
    var newStock = request.params.newStock;

    var query = new AV.Query(self.tools.getMcCmdyTable(mcEncode));
    query.equalTo('cmdyEncode',cmdyEncode);
    query.first({
        success:function(result){
            result.set('stock',newStock);
            result.save({
                success:function(result){response.success(result)},
                error:function(error){response.error(error)}
            });
        },
        error:function(error){
            response.error(error);
        }
    });
});

//获得某一天的订单数量
//not done yet
AV.Cloud.define('mcGetOrdersCountByDate',function(request,response){
    var mcEncode = request.params.mcEncode;
    var date = request.params.date;

    var query = new AV.Query('orders');
    query.equalTo('mcEncode',mcEncode);
});

AV.Cloud.define('dateTestFun',function(request,response){


});
