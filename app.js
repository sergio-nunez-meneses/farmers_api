const db = require('./models/index');
const session = require('express-session');
const fileUpload = require('express-fileupload');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var uploadRouter = require('./routes/upload');
// API
var getFarmersRouter = require('./routes/API/farmers/getFarmers');
var getFarmerRouter = require('./routes/API/farmers/getFarmer');
var getFarmsRouter = require('./routes/API/farms/getFarms');
var getFarmRouter = require('./routes/API/farms/getFarm');
var getProductsRouter = require('./routes/API/products/getProducts');
var getProductRouter = require('./routes/API/products/getProduct');
var getLabelsRouter = require('./routes/API/labels/getLabels');
var getLabelRouter = require('./routes/API/labels/getLabel');
var searchByRouter = require('./routes/API/search');
var clientRouter = require('./routes/API/clients/insertClient');
var contributionsRouter = require('./routes/API/clients/insertContributions');

var app = express();

// sessions
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  saveUninitialized: true,
  resave: true,
  cookie: {
    maxAge: 60000,
    secure: false
  }
}));

var sess = {
  secret: 'keyboard cat',
  cookie: {}
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(cookieParser());
app.use(session(sess));
app.use(session({
  // generate a custom session id for new sessions
  genid: function(req) {
    return genuuid() // use UUIDs for session IDs
  },
  secret: 'keyboard cat'
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/upload', uploadRouter);
// API
app.use('/API/farmers/getFarmers', getFarmersRouter);
app.use('/API/farmers/getFarmer', getFarmerRouter);
app.use('/API/farms/getFarms', getFarmsRouter);
app.use('/API/farms/getFarm', getFarmRouter);
app.use('/API/products/getProducts', getProductsRouter);
app.use('/API/products/getProduct', getProductRouter);
app.use('/API/labels/getLabels', getLabelsRouter);
app.use('/API/labels/getLabel', getLabelRouter);
app.use('/API/search', searchByRouter);
app.use('/API/clients/insertClient', clientRouter);
app.use('/API/clients/insertContributions', contributionsRouter);


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
