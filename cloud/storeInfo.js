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

AV.Cloud.define('cmGetStoreMain',function(request,response){
    var mcEncode = request.params.mcEncode;

    var cmdysArr = [];
    var imgsArr = [];

    var mcCmdyTable = self.tool.getMcCmdyTable(mcEncode);
    var query = new AV.Query(mcCmdyTable);
    query.equalTo('isDiscount',true);
    query.find({
        success:function(result){
            
           // response.success(result);
        },
        error:function(error){
            response.error(error);
        }
    });


    response.success(mcCmdyTable);









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

    var query = new AV.Query('Mc'+mcEncode+'Cmdy');
    query.equalTo('isDiscount',true);
    if(limit){
        query.limit(limit);
    }
    if(skip){
        query.skip(skip);
    }

    query.find({
        success:function(datas){
            response.success(datas);
        },
        error:function(error){
            response.error(error);
        }
    });
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

    var query = new AV.Query('Mc'+mcEncode+'Cmdy');
    query.equalTo('classId',classId);
    if(limit){
        query.limit(limit);
    }
    if(skip){
        query.skip(skip);
    }

    query.find({
        success:function(datas){
            console.log(classId);
            response.success(datas);
        },
        error:function(error){
            response.error(error);
        }
    });
});


AV.Cloud.define('cmGetCmdyIndo',function(request,response){
    var cmdyEncode = request.params.cmdyEncode;
    var mcEncode = request.params.mcEncode;
    var mcCmdyTable = 'Mc'+mcEncode+'Cmdy';
    var query = new AV.Query('mcCmdyTable');
    query.equalTo('cmdyEncode',cmdyEncode);
    query.first({
        success:function(data){
            response.success(data);
        },
        error:function(data,error){
            response.error(error);
        }
    });

});


