var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var port = process.env.PORT || 3000;


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mindmapOnlineShopRouter = require('./routes/mindmap-onlineShop');
var mindmapSecondProjectRouter = require('./routes/mindmap-secondproject');
var selectRouter = require('./routes/selectlecture');

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/mindmapest", { useNewUrlParser: true })

var db = mongoose.connection;
db.on('error', function(){
    console.log('DB Connection Failed!');
});
db.once('open', function() {
    console.log('DB Connected!');
});

var app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(__dirname + '/public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/mindmap-onlineshop',mindmapOnlineShopRouter);
app.use('/mindmap-secondProject',mindmapSecondProjectRouter);
app.use('/selectlecture',selectRouter);


console.log('서버가 실행되었습니다.');
module.exports = app;

var mongoose = require('mongodb');

