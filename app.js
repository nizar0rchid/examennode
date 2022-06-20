var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');


/* t3ayet lel routes */
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');


/*******   configuration connection mongo  */
//docker
//mongoose.connect("mongodb://database_service/revision");

//local
//mongoose.connect("mongodb://127.0.0.1:27017/revision");



mongoose.connect("mongodb://database_service/revision");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("Connected to MongoDB");
}).on('disconnected', function() {
    console.log("Disconnected from MongoDB");
}).on('reconnected', function() {
    console.log("Reconnected to MongoDB");
}).on('timeout', function() {
    console.log("Timeout from MongoDB");
}).on('close', function() {
    console.log("Close from MongoDB");
}).on('reconnectFailed', function() {
    console.log("Reconnect Failed from MongoDB");
}).on('error', function(err) {
    console.log("Error from MongoDB");
    console.log(err);
}).on('open', function() {
    console.log("Open from MongoDB");
}).on('disconnecting', function() {
        console.log("Disconnecting from MongoDB");
    }

);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/* configuration dossier uploads */
app.use(express.static(path.join(__dirname, 'uploads')));


/* les routes*/
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;