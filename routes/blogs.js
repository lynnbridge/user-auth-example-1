var express = require('express');
var router = express.Router();

// GET /blogs
router.get('/blogs', function(req, res, next) {
  return res.render('blogs/index', {_layoutFile: 'layouts/main', title: 'Blogs' });
});

// GET /blogs
router.get('/blog/:id', function(req, res, next) {
  var id = req.params.id;
  return res.render('blogs/show', {_layoutFile: 'layouts/main', title: 'Single Blog' });
});

// GET /blogs
router.get('/blog/:id/edit', function(req, res, next) {
  var id = req.params.id;
  return res.render('blogs/edit', {_layoutFile: 'layouts/main', title: 'Single Blog' });
});

// POST /blogs
router.post('/blog/:id/edit', function(req, res, next) {
  var id = req.params.id;
  return res.render('blogs/edit', {_layoutFile: 'layouts/main', title: 'Single Blog' });
});

module.exports = router;
