/**
 * 注册：
 * ApiName : cmSignUp
 * Go : {phoneNumber:string,password:string}
 * Back : {status:string}
 *
 */
var AV = require('leanengine');
var url = require("url");
AV.Cloud.define("cmSignUp",function(request,response){
    var params = request.params;
    var username = params.phoneNumber;
    var password = params.password;
    var user = new AV.User();
    user.set("username",username);
    user.set("password",password);
    user.signUp(null,{
        success:function(signUpUser){
            //返回的数据需要讨论统一
            response.success(signUpUser);
        },
        error:function(error,user){
            response.error(error);
        }
    });
});

AV.Cloud.define("cmSignIn",function(request,response){
    var params = request.params;
    var username = request.params.phoneNumber;
    var password = params.password;

   // var username = "13127582620";
    //var password = "135797";

    AV.User.logIn(username, password, {
        success: function(loginUser) {
            //返回的数据需要讨论统一
            response.success(loginUser);
        },
        error: function(user,loginErr) {
            response.error(loginErr);
        }
    });

});

