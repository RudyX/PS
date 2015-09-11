/**
 * Created by TimLi on 15/9/6.
 */

var express = require('express');
var domain = require('domain');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cloud = require('./../cloud');
var app = express();
app.use(cloud);

// App 全局配置
app.set('views',path.join(__dirname,'views'));   // 设置模板目录
app.set('view engine','jade');    // 设置 template 引擎
app.use(express.static('public'));
app.use(bodyParser.json());    // 读取请求 body 的中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
var app = express();



app.all('/test1', function(req, res) {
   // res.render('hello', { message: 'server, you just set up your app!' });
    console.log('get test1');
    res.send('server');
});

// 使用 Express 路由 API 服务 /hello 的 HTTP GET 请求
app.get('/hello', function(req, res) {
    res.render('hello', { message: 'Congrats, you just set up your app!' });
});




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



console.log('-------------------init file run!-----------------------');
module.exports = app;
