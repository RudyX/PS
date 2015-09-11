// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var domain = require('domain');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cloud = require('./cloud');

var app = express();

// App 全局配置
app.set('views',path.join(__dirname,'views'));   // 设置模板目录
app.set('view engine', 'jade');    // 设置 template 引擎
app.use(cloud);
app.use(express.static('public'));
app.use(bodyParser.json());    // 读取请求 body 的中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// 使用 Express 路由 API 服务 /hello 的 HTTP GET 请求
app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Congrats, you just set up your app!' });
});

app.use('/admin/index',function(req,res){
    res.render('admin/login',{title:'login',message:'msg~',dirname:__dirname});
});

app.use('/admin/login',function(req,res){
    res.render('admin/home',{title:'login',message:'msg~',dirname:__dirname});
});















/*--------------------------------------------------------------*/



//未处理异常捕获
app.use(function(req,res,next){
    var d = domain.create();
    d.add(req);
    d.add(res);
    d.on('error',function(err){
        console.error('uncaughtException url=%s, msg=%s', req.url, err.stack || err.message || err);
        if(!res.finished) {
            res.statusCode = 500;
            res.setHeader('content-type', 'application/json; charset=UTF-8');
            res.end('uncaughtException');
        }
    });
    d.run(next);
});


// 如果任何路由都没匹配到，则认为 404

 // 生成一个异常让后面的 err handler 捕获
 //生成一个异常让后面的 err handler 捕获
  app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

 // error handlers
 app.use(function(err, req, res, next) {
   console.log(err.stack || err.message || err);
   res.status(err.status || 500);
   res.send('error:' + err.message);
 });

module.exports = app;