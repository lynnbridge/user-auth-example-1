var express = require('express');
var engine = require('ejs-mate');
var session = require('express-session');
var app = express();

// serve static files from /public
app.use(express.static(__dirname + '/public'));

// use ejs-locals for all ejs templates
app.engine('ejs', engine);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

var routes = require('./routes/routes');
var blogs = require('./routes/blogs');
var users = require('./routes/users');
app.use('/', routes);
app.use('/blogs', blogs);
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
  console.log('ouch');
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// listen on port 3000
app.listen(3000, function () {
  console.log('Express app listening on port 3000');
});
