 //var AV = require('leanengine');
 //
 //var APP_ID = "pcyalv4v2pufgejdxrpe6b1fvvuorkhm76tyzzri67p9iy4i";
 //var APP_KEY = "98efzkhtjyfxko9dd90nyi974zmgjr9u19zaax16k7xfz7k6";
 //var MASTER_KEY = "mw1vaim0sztbuycr61s9bv7us86hredgdvm0yp3r18pyns7h";
 //
 //AV.initialize(APP_ID, APP_KEY, MASTER_KEY);
 //// 如果不希望使用 masterKey 权限，可以将下面一行删除
 //AV.Cloud.useMasterKey();
 ////AV.setPromisesAPluseCompliant(false);
 //
 //var app = require('./app');
 //
 //// 端口一定要从环境变量 `LC_APP_PORT` 中获取。
 //// LeanEngine 运行时会分配端口并赋值到该变量。
 //var PORT = parseInt(process.env.LC_APP_PORT || 3000);
 //app.listen(PORT, function () {
 //      console.log('Node app is running, port:', PORT);
 //    });

 'use strict';
 var AV = require('leanengine');

 var APP_ID = process.env.LC_APP_ID;
 var APP_KEY = process.env.LC_APP_KEY;
 var MASTER_KEY = process.env.LC_APP_MASTER_KEY;

 AV.initialize(APP_ID, APP_KEY, MASTER_KEY);
 // 如果不希望使用 masterKey 权限，可以将下面一行删除
 AV.Cloud.useMasterKey();
 // TODO 说明文档更新
 AV.Promise._isPromisesAPlusCompliant = false;

 var app = require('./app');

 // 端口一定要从环境变量 `LC_APP_PORT` 中获取。
 // LeanEngine 运行时会分配端口并赋值到该变量。
 var PORT = parseInt(process.env.LC_APP_PORT || 3000);
 app.listen(PORT, function () {
  console.log('Node app is running, port:', PORT);
 });
