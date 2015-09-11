/**
 * Created by TimLi on 15/9/6.
 */

var app = require('./init');
console.log('-----------admini file run--------------');

app.get('/test2', function(req, res) {
    res.send('test2');
});
