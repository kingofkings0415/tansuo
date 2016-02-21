var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');


//路由模块
var routes = require('./routes/index');
var user = require('./routes/user');
var article = require('./routes/article');
var admin = require('./routes/admin');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

  
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'static')));

app.use(express.static(__dirname, 'index.html'));
app.use('/a', express.static(path.join(__dirname,  'a')));
//添加处理模块
app.use('/', routes);
//app.use('/user', user);
//app.use('/article',article);
app.use('/admin',admin);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('对不起!您请求的页面不存在或者已经被删除!');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;
