var express = require('express');
var router = express.Router();

// GET /users
router.get('/', function(req, res, next) {
  return res.render('users/index', {_layoutFile: 'layouts/main', title: 'Users' });
});

// GET /users
router.get('/new', function(req, res, next) {
  return res.render('users/new', {_layoutFile: 'layouts/main', title: 'New User' });
});

// POST /users
router.post('/new', function(req, res, next) {
  return res.render('users/new', {_layoutFile: 'layouts/main', title: 'New User' });
});

// GET /users
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  return res.render('users/show', {_layoutFile: 'layouts/main', title: 'Single Blog' });
});

// GET /users
router.get('/:id/edit', function(req, res, next) {
  var id = req.params.id;
  return res.render('users/edit', {_layoutFile: 'layouts/main', title: 'Single Blog' });
});

// POST /users
router.post('/:id/edit', function(req, res, next) {
  var id = req.params.id;
  return res.render('users/edit', {_layoutFile: 'layouts/main', title: 'Single Blog' });
});

module.exports = router;
