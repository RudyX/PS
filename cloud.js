
// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:


var AV = require('leanengine');

require("./cloud/userInfo.js");
require("./cloud/storeInfo.js");
require("./cloud/merchantApi.js");




AV.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

module.exports = AV.Cloud;
