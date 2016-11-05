var express = require('express');
var router = express.Router();

// GET /users
router.get('/users', function(req, res, next) {
  return res.render('users/index', {_layoutFile: 'layouts/main', title: 'Blogs' });
});

// GET /users
router.get('/user/:id', function(req, res, next) {
  var id = req.params.id;
  return res.render('users/show', {_layoutFile: 'layouts/main', title: 'Single Blog' });
});

// GET /users
router.get('/user/:id/edit', function(req, res, next) {
  var id = req.params.id;
  return res.render('users/edit', {_layoutFile: 'layouts/main', title: 'Single Blog' });
});

// POST /users
router.post('/user/:id/edit', function(req, res, next) {
  var id = req.params.id;
  return res.render('users/edit', {_layoutFile: 'layouts/main', title: 'Single Blog' });
});

module.exports = router;
