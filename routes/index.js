var express = require('express');
var router = express.Router();
//var User = require('../models/user');
var mid = require('../middleware');
var user = require('../models/users');

// GET /
router.get('/', function(req, res, next) {
  return res.render('index', {_layoutFile: 'layouts/main', title: 'Home' });
});

// GET /about
router.get('/about', function(req, res, next) {
  return res.render('about', {_layoutFile: 'layouts/main', title: 'About' });
});

// GET /contact
router.get('/contact', function(req, res, next) {
  return res.render('contact', {_layoutFile: 'layouts/main', title: 'Contact' });
});

// GET /profile
router.get('/profile', function(req, res, next) {
  var id = parseInt(req.session.userId);
  user.getUser(id, function (error, user) {
    debugger
    if (error || !user) {
      return next(error);
    } else {
      return res.render('profile', {_layoutFile: 'layouts/main', title: 'Profile', user: user });
    }
  });
});

// GET /register
router.get('/register', mid.loggedOut, function(req, res, next) {
  return res.render('register', {_layoutFile: 'layouts/main', title: 'Register' });
});

// POST /register
router.post('/register', function(req, res, next) {
  if (req.body.name && req.body.email &&
      req.body.password && req.body.confirmPassword) {

      // confirm same password
      if (req.body.password !== req.body.confirmPassword) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        return next(err);
      }
      bcrypt.hash(req.body.password, 10, function(err, hash) {
        if (err) {
          return next(err);
        }
        db.none('insert into users(name, email, password)' +
            'values($1, $2, $3)', [req.body.name, req.body.email, hash])
          .then(function () {
            req.session.userId = user._id;
            return res.redirect('/profile');
          })
          .catch(function (err) {
            return next(err);
          });
      });
    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
});

// GET /login
router.get('/login', mid.loggedOut, function(req, res, next) {
  return res.render('login', {_layoutFile: 'layouts/main', title: 'Login' });
});

router.post('/login', function(req, res, next) {
  if (req.body.email && req.body.password) {
    user.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user) {
        var err = new Error('Invalid email or password.');
        err.status = 401;
        return next(err);
      }  else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    var err = new Error('Email and password are required.');
    err.status = 401;
    return next(err);
  }
});

// GET /error
router.get('/error', function(req, res, next) {
  return res.render('error', {_layoutFile: 'layouts/main', title: 'Error' });
});

module.exports = router;
