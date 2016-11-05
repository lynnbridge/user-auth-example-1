var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')();
var db = pgp('postgres://localhost:5432/userauth');

// GET /posts
router.get('/', function(req, res, next) {
  db.any('select * from posts')
    .then(function (data) {
      res.status(200)
      return res.render('posts/index', {_layoutFile: 'layouts/main', title: 'Posts', data: data });
    })
    .catch(function (err) {
      debugger
      return next(err);
    });
});

// GET /posts
router.get('/new', function(req, res, next) {
  return res.render('posts/new', {_layoutFile: 'layouts/main', title: 'New Post' });
});

// POST /posts
router.post('/new', function(req, res, next) {
  return res.render('posts/new', {_layoutFile: 'layouts/main', title: 'New Post' });
});

// GET /posts
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  return res.render('posts/show', {_layoutFile: 'layouts/main', title: 'Single Post' });
});

// GET /posts
router.get('/:id/edit', function(req, res, next) {
  var id = req.params.id;
  return res.render('posts/edit', {_layoutFile: 'layouts/main', title: 'Single Post' });
});

// POST /posts
router.post('/:id/edit', function(req, res, next) {
  var id = req.params.id;
  return res.render('posts/edit', {_layoutFile: 'layouts/main', title: 'Single Post' });
});

module.exports = router;
