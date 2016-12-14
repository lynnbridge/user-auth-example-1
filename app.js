require('dotenv').load();
var express = require('express');
var engine = require('ejs-mate');
var session = require('express-session');
var pgp = require('pg-promise')();
var app = express();
var bodyParser = require('body-parser');


// serve static files from /public
app.use(express.static(__dirname + '/public'));

// use ejs-locals for all ejs templates
app.engine('ejs', engine);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(session({
  secret: process.env.COOKIE_SECRET,
  name: 'userId',
  resave: true,
  saveUninitialized: false,
  secure: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 30 days
}));

// Body parser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// routes
var routes = require('./routes/index');
var posts = require('./routes/posts');
var users = require('./routes/users');
app.use('/', routes);
app.use('/posts', posts);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// listen on port 3000
app.listen(process.env.PORT, function () {
  console.log('Express app listening on port 3000');
});
