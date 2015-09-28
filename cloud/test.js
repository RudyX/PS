/**
 * Created by TimLi on 15/8/23.
 */

var AV = require('leanengine');
var self = require('./toolsModule');

AV.Cloud.define('testfun3',function(request,response){

    var post = AV.Object.new('cmdytest');
    post.set('barcode','1231231023');

    post.save(null,{
        success:function(post){
            response.success(post);
        },
        error:function(post,error){
            response.error(error);
        }
    });
});

AV.Cloud.define('getPicsByBarcode',function(request,response){
    var barcode = request.params.barcode;
    //var barcode = '1000002';
    if(!count){
        count = 5;
    }
    var count = request.params.count;
    var query = new AV.Query('_File');
    var fileURLList = new Array();
   // var name = null;

    //name = barcode+'0'+i+'.png';
    query.startsWith('name',barcode);
    //console.log('name:'+name);
    query.find({
        success:function(data){

            for(var i=0;i<5;i++){
                fileURLList.push(data[i].get('url'));
            }
            console.log(fileURLList.length);
            response.success(fileURLList);
        },
        error:function(data,error){
            console.log('error : '+i);
            console.log(error);
        }
    });
});


AV.Cloud.define('fieldtest',function(request,response){
    var Post = AV.Object.extend('Post');
    var post = new Post();
    post.set('name','Tim');
    post.set('age',18);
    var obj = self.tools.getField(['name','age'],post);
    console.log(obj);
    response.success(obj);

});


