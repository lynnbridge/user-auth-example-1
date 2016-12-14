var express = require('express');
var router = express.Router();
var promise = require('bluebird');
var options = {
  promiseLib: promise
};
var pgp = require('pg-promise')(options);
var db = pgp(process.env.DATABASE_URL);

router.use( function( req, res, next ) {
  if ( req.query._method == 'DELETE' ) {
    req.method = 'DELETE';
    req.url = req.path;
  }
  next();
});

// GET index /posts/
router.get('/', function(req, res, next) {
  db.any('select * from posts')
    .then(function (data) {
      return res.render('posts/index', {_layoutFile: 'layouts/main', title: 'Posts', data: data });
    })
    .catch(function (err) {
      return next(err);
    });
});

// GET new /posts view
router.get('/new', function(req, res, next) {
  return res.render('posts/new', {_layoutFile: 'layouts/main', title: 'New Post' });
});

// POST new /posts
router.post('/new', function(req, res, next) {
  db.none('insert into posts(title, content)' +
      'values(${title}, ${content})',
    req.body)
    .then(function () {
      res.redirect('/posts');
    })
    .catch(function (err) {
      return next(err);
    });
});

// GET /posts show
router.get('/:id', function(req, res, next) {
  var id = parseInt(req.params.id);
  db.one('select * from posts where id = $1', id)
    .then(function (data) {
      return res.render('posts/show', {_layoutFile: 'layouts/main', title: data.title, post: data });
    })
    .catch(function (err) {
      return next(err);
    });
});

// GET /posts edit
router.get('/:id/edit', function(req, res, next) {
  var id = parseInt(req.params.id);
  db.one('select * from posts where id = $1', id)
    .then(function (data) {
      return res.render('posts/edit', {_layoutFile: 'layouts/main', title: data.title, post: data });
    })
    .catch(function (err) {
      return next(err);
    });

});

// PUT /posts edit
router.post('/:id/edit', function(req, res, next) {
  db.none('update posts set title=$1, content=$2 where id=$3',
    [req.body.title, req.body.content, parseInt(req.params.id)])
    .then(function () {
      res.redirect('/posts');
    })
    .catch(function (err) {
      return next(err);
    });
});

//Delete posts
router.delete('/:id', function(req, res, next){
  var id = parseInt(req.params.id);
  db.result('delete from posts where id = $1', id)
    .then(function (result) {
      res.redirect('/posts');
    })
    .catch(function (err) {
      return next(err);
    });
});

module.exports = router;
