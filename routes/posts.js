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
      return next(err);
    });
});

// GET /posts
router.get('/new', function(req, res, next) {
  return res.render('posts/new', {_layoutFile: 'layouts/main', title: 'New Post' });
});

// POST /posts
router.post('/new', function(req, res, next) {
  db.none('insert into posts(title, content)' +
      'values(${title}, ${content})',
    req.body)
    .then(function () {
      res.status(200);
      res.redirect('/posts');
    })
    .catch(function (err) {
      return next(err);
    });
});

// GET /posts
router.get('/:id', function(req, res, next) {
  var id = parseInt(req.params.id);
  db.one('select * from posts where id = $1', id)
    .then(function (data) {
      res.status(200);
      return res.render('posts/show', {_layoutFile: 'layouts/main', title: data.title, post: data });
    })
    .catch(function (err) {
      return next(err);
    });
});

// GET /posts
router.get('/:id/edit', function(req, res, next) {
  var id = req.params.id;
  db.one('select * from posts where id = $1', id)
    .then(function (data) {
      res.status(200)
      return res.render('posts/edit', {_layoutFile: 'layouts/main', title: data.title, post: data });
    })
    .catch(function (err) {
      return next(err);
    });

});

// PUT /posts
router.post('/:id/edit', function(req, res, next) {
  db.none('update posts set title=$1, content=$2 where id=$3',
    [req.body.title, req.body.content, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
      res.redirect('/posts');
    })
    .catch(function (err) {
      return next(err);
    });
});

module.exports = router;
