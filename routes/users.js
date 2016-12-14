var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var pgp = require('pg-promise')();
var db = pgp(process.env.DATABASE_URL);

router.use( function( req, res, next ) {
  if ( req.query._method == 'DELETE' ) {
    req.method = 'DELETE';
    req.url = req.path;
  }
  next();
});

// GET /users index
router.get('/', function(req, res, next) {
  db.any('select * from users')
    .then(function (data) {
      return res.render('users/index', {_layoutFile: 'layouts/main', title: 'Users', data: data });
    })
    .catch(function (err) {
      return next(err);
    });
});

// GET /users new
router.get('/new', function(req, res, next) {
  return res.render('users/new', {_layoutFile: 'layouts/main', title: 'New User' });
});

// POST /users new
router.post('/new', function(req, res, next) {
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    db.none('insert into users(name, email, password)' +
        'values($1, $2, $3)', [req.body.name, req.body.email, hash])
      .then(function () {
        res.redirect('/users');
      })
      .catch(function (err) {
        return next(err);
      });
  });
});

// GET /users show
router.get('/:id', function(req, res, next) {
  var id = parseInt(req.params.id);
  db.one('select * from users where id = $1', id)
    .then(function (data) {
      return res.render('users/show', {_layoutFile: 'layouts/main', title: data.name, user: data });
    })
    .catch(function (err) {
      return next(err);
    });
});

// GET /users edit
router.get('/:id/edit', function(req, res, next) {
  var id = parseInt(req.params.id);
  db.one('select * from users where id = $1', id)
    .then(function (data) {
      return res.render('users/edit', {_layoutFile: 'layouts/main', user: data });
    })
    .catch(function (err) {
      return next(err);
    });
});

// POST /users edit
router.post('/:id/edit', function(req, res, next) {
  var id = parseInt(req.params.id);
  db.none('update users set name=$1, email=$2, password=$3 where id=$4',
    [req.body.name, req.body.email, req.body.password, parseInt(req.params.id)])
    .then(function () {
      res.redirect('/users');
    })
    .catch(function (err) {
      return next(err);
    });
});

//Delete posts
router.delete('/:id', function(req, res, next){
  var id = parseInt(req.params.id);
  db.result('delete from users where id = $1', id)
    .then(function (result) {
      res.redirect('/users');
    })
    .catch(function (err) {
      return next(err);
    });
});

module.exports = router;
