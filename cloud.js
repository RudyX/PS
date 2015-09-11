
// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:


var AV = require('leanengine');

/**
 * 库商品
 * 字段：待填
 *
 *
 */
//var CenterCmdy = AV.Object.extend('CenterCmdy');




require("./cloud/userInfo.js");
require("./cloud/storeInfo.js");
require("./cloud/merchantApi.js");
require('./cloud/serverApi.js');
require('./cloud/test.js');





AV.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});



module.exports = AV.Cloud;
