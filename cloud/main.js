require("cloud/app.js");
require("cloud/userInfo.js");
require("cloud/storeInfo.js");
// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

AV.Cloud.define("test",function(request,response){
  response.success("test success");

});

