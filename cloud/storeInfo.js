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


AV.Cloud.define('testfun2',function(request,response){


    fs.readFile(__dirname+'/../client/img/1.png',function(err,data){
        if(err)
        {
            console.log("error");
            console.log(err);
            //response.error(err);
        }
        // console.log(data);

        var picFile = new AV.File('test0821.png',data);

        picFile.save().then(function(){
            console.log('save success');
            response.success(data);
        },function(err){
            console.log('error');
            console.log(err);
            response.error(err);
        });
    });
});


