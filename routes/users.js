var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')();
var db = pgp('postgres://localhost:5432/userauth');

// GET /users
router.get('/', function(req, res, next) {
  db.any('select * from users')
    .then(function (data) {
      res.status(200)
      return res.render('users/index', {_layoutFile: 'layouts/main', title: 'Users', data: data });
    })
    .catch(function (err) {
      return next(err);
    });
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
  db.one('select * from users where id = $1', id)
    .then(function (data) {
      res.status(200);
      return res.render('users/show', {_layoutFile: 'layouts/main', title: data.name, user: data });
    })
    .catch(function (err) {
      return next(err);
    });
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
