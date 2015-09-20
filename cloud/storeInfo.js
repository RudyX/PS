var http = require("http");
var fs = require('fs');
var AV = require('leanengine');
var querystring = require('querystring');
var self = require('./toolsModule');


AV.Cloud.define("cmGetAroundStoreList",function(request,response){
    //center = "xxx.xxxxxx,xxx.xxxxxx";
    var center = request.params.center;
    if(center == null){
        console.log("center is null");
        center =  "121.597575,31.265437";
    }
    var queryParams = {
        key:'9f85b87a014354cb5e0fe5bfe9af076c',
        tableid:'55d1e906e4b01ef498f1f86a',
        center:center
    };
    var queryParams = querystring.stringify(queryParams);
    var option = {
        hostname : 'yuntuapi.amap.com',
        path : '/datasearch/around?'+queryParams,
        method:'get',
    };
    var req = http.request(option,function(res){
        res.on('data',function(chunk){

            var dataObj = JSON.parse(chunk.toString());




            //地址名让王直接用高德地图的api，高德地图只支持客户端获取逆地理编码

            response.success(dataObj.datas);

        });
    });
    req.on('error',function(e){
        response.error(e);
    });
    req.end();
});


// Finish
/**
 *
       {
            "result": {
            "cmdys": [
                {
                    "cmdyName": "天地粮人",
                    "price": 39.8,
                    "disPrice": 20,
                    "cmdyEncode": "D0103002",
                    "stock": 20000,
                    "url": "http://ac-pcyalv4v.clouddn.com/83eb42a4-e0ec-c000-feb6-327e5ac386f7.png"
                }
            ],
                "adImg": [
                "http://ac-pcyalv4v.clouddn.com/a0b7bf5c-32ab-d526-5b86-1334cc3935f3.png",
                "http://ac-pcyalv4v.clouddn.com/b16ef40d-4565-9251-fb0a-0d95be7459bd.png",
                "http://ac-pcyalv4v.clouddn.com/8c2aed45-3139-b7c1-34da-afd608d2c699.png"
               ]
           }
         }
 */




AV.Cloud.define('cmGetStoreMain',function(request,response){
    var mcEncode = request.params.mcEncode;

    var cmdysArr = [];
    var imgsArr = [];
    var disEncode = [];
    var allData = {};

    var mcCmdyTable = self.tools.getMcCmdyTable(mcEncode);
    var mcADName = self.tools.getMCAD(mcEncode);

    var imgQuery = new AV.Query('_File');
    var cmdyQuery = new AV.Query(mcCmdyTable);
    var disQuery = new AV.Query('_File');

    //get img url with array of cmdyEncode
    cmdyQuery.equalTo('isDiscount',true);
    cmdyQuery.find({
        success:function(result){

            cmdyOnFinish(result);

            // if get discmdy success
            // query the dis img url
            console.log(disEncode);
            disQuery.containedIn('name',disEncode);
            disQuery.find({
                success:function(result){
                    disImgOnFinish(result);

                    //if get discount cmdy img success
                    // query merchant ad imgs
                    imgQuery.startsWith('name',mcADName);
                    imgQuery.find({
                        success:function(result){
                            adImgOnFinish(result);
                            allOnFinish();
                            response.success(allData);
                        },
                        error:function(error){
                            console.log('------ FAIL -------');
                            response.error(error);
                        }
                    });
                },
                error:function(error){
                    response.error(error);
                }
            });
        }
    });


    //get discount cmdy data
    var cmdyOnFinish = function(result){
        for(index in result){
            if(index > 17)
            {break;}
            cmdysArr[index] = {};
            cmdysArr[index].cmdyName = result[index].get('cmdyName');
            cmdysArr[index].specification = result[index].get('specification');
            cmdysArr[index].price = result[index].get('price');
            cmdysArr[index].disPrice = result[index].get('disPrice');
            cmdysArr[index].cmdyEncode = result[index].get('cmdyEncode');
            disEncode[index] = 'cmdy'+result[index].get('cmdyEncode')+'01.png';
            cmdysArr[index].stock = result[index].get('stock');
        }

    };

    //get merchant AD pics' url
    var adImgOnFinish = function(result){
        for(index in result){
            imgsArr.push(result[index].get('url'));
        }
    };


   var disImgOnFinish = function(result){
       for(index in result){

           cmdysArr[index].url = result[index].get('url');
       }
       console.log('---- disImgOnFinish ----');
       console.log(cmdysArr);

   };

    var allOnFinish = function(){

        allData.cmdys = cmdysArr;
        allData.adImg = imgsArr;
    }







});


/**
 *
 * 获得打折商品的列表
 * 参数：mcEncode、limit、skip
 * limit和skip是可以忽略的，在做数据分页或者只显示一部分的时候可以用
 * 返回的数据还有待商榷
 */

AV.Cloud.define('cmGetDiscountCmdy',function(request,response){
    var mcEncode = request.params.mcEncode;
    var limit = request.params.limit;
    var skip = request.params.skip;


    var cmdysArr = [];
    var imgNameArr = [];


    var query = new AV.Query(self.tools.getMcCmdyTable(mcEncode));
    var imgQuery = new AV.Query('_File');

    query.equalTo('isDiscount',true);
    if(limit){
        query.limit(limit);
    }
    if(skip){
        query.skip(skip);
    }
    query.find({
        success:function(result){
            cmdyFindOnFinish(result);
            imgQuery.containedIn('name',imgNameArr);
            //get imgs
            imgQuery.find({
                success:function(result){
                    imgFindOnFinish(result);
                    response.success(cmdysArr);
                },
                error:function(error){
                    response.error(error);
                }

            });


        },
        error:function(error){
            response.error(error);
        }
    });
    var cmdyFindOnFinish = function(result){
        for(index in result){
            cmdysArr[index] = {};
            cmdysArr[index].cmdyName = result[index].get('cmdyName');
            cmdysArr[index].specification = result[index].get('specification');
            cmdysArr[index].price = result[index].get('price');
            cmdysArr[index].disPrice = result[index].get('disPrice');
            cmdysArr[index].cmdyEncode = result[index].get('cmdyEncode');
            imgNameArr[index] = 'cmdy'+result[index].get('cmdyEncode')+'01.png';
            cmdysArr[index].stock = result[index].get('stock');
        }
    }

    var imgFindOnFinish = function(result){
        for(index in result){
            cmdysArr[index].url = result[index].get('url');
        }
    };
});


/**
 *  返回的数据未作处理
 *  limit、skip参数可选，用于分页查询
 */

AV.Cloud.define('cmGetCmdyList',function(request,response){
    var mcEncode = request.params.mcEncode;
    var classId = request.params.classId;
    var limit = request.params.limit;
    var skip = request.params.skip;

    var cmdysArr = [];
    var imgNameArr = [];

    var query = new AV.Query(self.tools.getMcCmdyTable(mcEncode));
    var imgQuery = new AV.Query('_File');

    query.equalTo('classId',classId);
    if(limit){
        query.limit(limit);
    }
    if(skip){
        query.skip(skip);
    }

    query.find({
        success:function(result){

            cmdyFindOnFinish(result);
            imgQuery.containedIn('name',imgNameArr);
            imgQuery.find({
                success:function(result){
                    imgOnFinish(result);
                    response.success(cmdysArr);
                },
                error:function(error){
                    response.error(error)
                }
            });
        },
        error:function(error){
            response.error(error);
        }
    });

    var cmdyFindOnFinish = function(result){
        for(index in result){
            cmdysArr[index] = {};
            cmdysArr[index].cmdyName = result[index].get('cmdyName');
            cmdysArr[index].classId = result[index].get('classId');
            cmdysArr[index].specification = result[index].get('specification');
            cmdysArr[index].price = result[index].get('price');
            cmdysArr[index].isDiscount = result[index].get('isDiscount');
            cmdysArr[index].disPrice = result[index].get('disPrice');
            cmdysArr[index].cmdyEncode = result[index].get('cmdyEncode');
            imgNameArr[index] = 'cmdy'+result[index].get('cmdyEncode')+'01.png';
            cmdysArr[index].stock = result[index].get('stock');
        }
    };

    var imgOnFinish = function(result){
        for(index in result){
            cmdysArr[index].url = result[index].get('url');
        }
    };


});


AV.Cloud.define('cmGetCmdyInfo',function(request,response){
    console.log('--------- param ------------');
    console.log(request);
    console.log('--------- param ------------');
    var cmdyEncode = request.params.cmdyEncode;
    var mcEncode = request.params.mcEncode;
    var cmdy = {};
    var urls = [];
    var imgName;

//there has not finish yet
    var query = new AV.Query(self.tools.getMcCmdyTable(mcEncode));
    var imgQuery = new AV.Query('_File');

    query.equalTo('cmdyEncode',cmdyEncode);
    query.first({
        success:function(result){
            cmdyFindOnFinish(result);
            imgQuery.startsWith('name',imgName);
            imgQuery.find({
                success:function(result){
                    allOnFinish(result);
                    response.success(cmdy);
                },
                error:function(error){
                    response.error(error);
                }
            });


        },
        error:function(data,error){
            response.error(error);
        }
    });

    var cmdyFindOnFinish = function(result){
        cmdy.cmdyName = result.get('cmdyName');
        cmdy.classId = result.get('classId');
        cmdy.trademark = result.get('trademark');
        cmdy.barcode = result.get('barcode');
        cmdy.specification = result.get('specification');
        cmdy.cmdyEncode = result.get('cmdyEncode');
        cmdy.manufacturer = result.get('manufacturer');
        cmdy.price = result.get('price');
        cmdy.isDiscount = result.get('isDiscount');
        cmdy.disPrice = result.get('disPrice');
        cmdy.stock = result.get('stock');
        cmdy.pdtionDate = result.get('pdtionDate');
        cmdy.deadline = result.get('deadline');
        cmdy.orign = result.get('orign');
        cmdy.description = result.get('description');

        imgName = 'cmdy'+result.get('cmdyEncode');
    };
    var allOnFinish = function(result){
        for(index in result){
            urls[index] = result[index].get('url');
        }
        cmdy.urls = urls;
    };
});


// has not done yet
AV.Cloud.define('cmPlaceAnOrder',function(request,response){

    //获取所有请求参数
    var mcEncode = request.params.mcEncode;
    var consignee = request.params.consignee;
    var orderAddress = request.params.orderAddress;
    var cPhone = request.params.cPhone;
    var cmName = request.params.cmName;
    var cmdyEnocdes = [];//only cmdyEncode and quantity;

    for(var i in request.params.cmdys){
        cmdyEnocdes[i] = request.params.cmdys[i].cmdyEncode;
    }




    //完善订单信息，相关数据从商户商品表和商户数据中取
    var orderEncode = Math.random();//订单编号待定，暂时先用时间代替
    //var Cmdy = function(cmdyEncode,cmdyName,price,isDiscount,disPrice,quantity){
        //需要补充的信息
     var cmdys = [];
     var mcPhone = '';
     var nativePrice = 0; //从数据库中得到的所有商品后计算出总的原价
     var discount = 0;//计算所有优惠的总和
     var freight = 0 ;//运费
     var totalCost = 0;//
   // };

    var mcQuery  = new AV.Query('_User');

    mcQuery.equalTo('mcEncode',mcEncode);
    mcQuery.first({
        success:function(result){
            //console.log(result);
            mcPhone = result.get('mcPhone');
            freight = result.get('freight');
            var cmdysQuery = new AV.Query(self.tools.getMcCmdyTable(mcEncode));
            cmdysQuery.containedIn('cmdyEncode',cmdyEnocdes);
            cmdysQuery.find({
                success:function(result){

                    getCmdyOnFinish(result);
                    var order = fillOrder();
                    order.save(null,{
                        success:function(result){
                            response.success(order)
                        },
                        error:function(error){
                            console.log('---- save order error ----');
                            response.error(error);
                        }
                    });


                    response.success(order);
                },
                error:function(error){
                    response.error(error);
                }
            });
        },
        error:function(error){
            response.error(error);
        }
    });


    //得到cmdys
    var getCmdyOnFinish = function(result){
        for(var index in result){
            cmdys[index] = {};
            //cmdys[index].mcEncode = result[index].get('mcEncode');
            cmdys[index].cmdyEncode = result[index].get('cmdyEncode');
            cmdys[index].cmdyName = result[index].get('cmdyName');
            cmdys[index].specification = result[index].get('specification');
            cmdys[index].price = result[index].get('price');
            cmdys[index].isDiscount = result[index].get('isDiscount');
            cmdys[index].disPrice = result[index].get('disPrice');
            for(var k in request.params.cmdys){
                if(cmdys[index].cmdyEncode === request.params.cmdys[k].cmdyEncode)
                {
                    cmdys[index].quantity = request.params.cmdys[k].quantity;
                    console.log('------ quantity ------');
                    console.log(request.params.cmdys[k].quantity);
                }


            }
            nativePrice += cmdys[index].price*cmdys[index].quantity;

            if(cmdys[index].isDiscount === true){
                totalCost += cmdys[index].disPrice*cmdys[index].quantity;
            }else {
                totalCost += cmdys[index].price*cmdys[index].quantity;
            }
        }
        totalCost += freight;
        discount = nativePrice - totalCost + freight

    };


    var fillOrder = function(){
        var Order = AV.Object.extend('orders');
        var order = new Order();
        order.set('orderEncode',orderEncode);
        order.set('cmName',cmName);
        order.set('consignee',consignee);
        order.set('orderAddress',orderAddress);
        order.set('cPhone',cPhone);
        order.set('cmdys',cmdys);
        order.set('mcEncode',mcEncode);
        order.set('mcPhone',mcPhone);
        order.set('nativePrice',nativePrice);
        order.set('discount',discount);
        order.set('freight',freight);
        order.set('totalCost',totalCost);
        order.set('status','created');
        return order;
    };
});


AV.Cloud.define('cmGetOrdersList',function(request,response){
    var cmName = request.params.cmName;
    var status = request.params.status;
    var limit = request.params.limit;
    var skip = request.params.skip;

    console.log(request.params);
    var query = new AV.Query('orders');
    query.equalTo('cmName',cmName);
    query.equalTo('status',status);
    if(limit){
        query.limit(limit);
    }
    if(skip){
        query.skip(skip);
    }

    //console.log(query);
    query.find({
        success:function(result){
            console.log(result);
            response.success(result);
        },
        error:function(error){
            response.error(error);
        }

    });



});