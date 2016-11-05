var express = require('express');
var router = express.Router();

// GET /blogs
router.get('/', function(req, res, next) {
  return res.render('blogs/index', {_layoutFile: 'layouts/main', title: 'Blogs' });
});

// GET /blogs
router.get('/new', function(req, res, next) {
  return res.render('blogs/new', {_layoutFile: 'layouts/main', title: 'New Blog' });
});

// POST /blogs
router.post('/new', function(req, res, next) {
  return res.render('blogs/new', {_layoutFile: 'layouts/main', title: 'New Blog' });
});

// GET /blogs
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  return res.render('blogs/show', {_layoutFile: 'layouts/main', title: 'Single Blog' });
});

// GET /blogs
router.get('/:id/edit', function(req, res, next) {
  var id = req.params.id;
  return res.render('blogs/edit', {_layoutFile: 'layouts/main', title: 'Single Blog' });
});

// POST /blogs
router.post('/:id/edit', function(req, res, next) {
  var id = req.params.id;
  return res.render('blogs/edit', {_layoutFile: 'layouts/main', title: 'Single Blog' });
});

module.exports = router;
