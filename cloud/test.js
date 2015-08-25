/**
 * Created by TimLi on 15/8/23.
 */

var AV = require('leanengine');

AV.Cloud.define('testfun3',function(request,response){
    //var query1 = new AV.Query('tCommodity');
    //query1.get('55d855fee4b0db80a572c44e',{
    //    success:function(cmdy){
    //        var file1 = AV.File.createWithoutData('55d975cf60b26a5284674f86');
    //        var file2 = AV.File.createWithoutData('55d975cf00b01d2966855c26');
    //       // console.log(file1);
    //        //var relation  = cmdy.relation('pics2');
    //        //relation.add(file1);
    //
    //
    //        cmdy.set('pics',file2);
    //        cmdy.set('pics',file1);
    //
    //        cmdy.save(null,{
    //            success:function(data){
    //                console.log(data);
    //                response.success(data);
    //            }
    //        });
    //
    //
    //    },
    //    error:function(object,error){
    //
    //    }
    //});

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

//AV.Cloud.beforeSave('cmdytest',function(request,response){
//    console.log('in beforesave');
//    console.log(request);
//    var post = AV.Object.new('POST');
//    post.set('obj',request);
//    post.set('bar','123'+request.object.get('objectId'));
//    post.save();
//    response.success();
//});

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

                //var file = AV.File.createWithoutData(data.get('objectId'));
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