var express = require('express');
var router = express.Router();
//var User = require('../models/user');
//var mid = require('../middleware');

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
  return res.render('profile', {_layoutFile: 'layouts/main', title: 'Profile' });
});

// GET /register
router.get('/register', function(req, res, next) {
  return res.render('register', {_layoutFile: 'layouts/main', title: 'Register' });
});

// GET /login
router.get('/login', function(req, res, next) {
  return res.render('login', {_layoutFile: 'layouts/main', title: 'Login' });
});

// GET /error
router.get('/error', function(req, res, next) {
  return res.render('error', {_layoutFile: 'layouts/main', title: 'Error' });
});


module.exports = router;
