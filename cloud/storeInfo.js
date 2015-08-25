var http = require("http");
var fs = require('fs');
var AV = require('leanengine');
var querystring = require('querystring');


AV.Cloud.define("cmGetAroundStoreList",function(request,response){
    var center = request.center;
    if(center == null){
        center =  "121.527184,31.228728";
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
            console.log(""+chunk);
            response.success(""+chunk);
        });
    });
    req.on('error',function(e){
        response.error(e);
    });
    req.end();
});

AV.Cloud.define('cmGetStoreMain',function(request,response){

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


AV.Cloud.define('testfun2',function(request,response){


    fs.readFile(__dirname+'/../client/img/1.png',function(err,data){
        if(err)
        {
            console.log("error");
            console.log(err);

        }

        //var picFile = new AV.File('test0821.png',data);
        //
        //picFile.save().then(function(){
        //    console.log('save success');
        //    response.success(data);
        //},function(err){
        //    console.log('error');
        //    console.log(err);
        //    response.error(err);
        //});


        //save pic in CmdyPicture
        //var CmdyPicture = AV.Object.extend('CmdyPicture');
        //var cmdyPic = new CmdyPicture();
        //cmdyPic.set('dataBase64',data.toString("base64"));
        //console.log('prepare to save...');
        ////console.log(data.toString("base64"));
        //cmdyPic.save(null,{
        //    success:function(data){
        //        console.log('success');
        //        response.success(data);
        //
        //    },
        //    error:function(object,error){
        //        console.log('error');
        //        response.error(error);
        //    }
        //});



        var query = new AV.Query('_File');
        //var file = profile.get('test0821.png');
       // var file

        query.equalTo('name','test0821.png');
        query.find({
            success:function(datas){


                var data = datas[0];

                console.log(data.url());
                response.success(data);
            },
            error:function(error){
                console.loge(error);
            }
        });

    });
});


