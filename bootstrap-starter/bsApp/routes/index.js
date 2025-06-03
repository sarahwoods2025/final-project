var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to Web3 BootStrap App', name:null });
});

router.post('/', function(req, res, next) {

  res.render('index', { title: 'Welcome to Web3 BootStrap App', name:req.body.name });
});

router.get('/page1', function(req, res, next) {
  res.render('page1', { title: 'Welcome to Web3 BootStrap App', name:null });
});

router.get('/page2', function(req, res, next) {
  res.render('page2', { title: 'Welcome to Web3 BootStrap App', name:null });
});

router.get('/page3', function(req, res, next) {
  res.render('page3', { title: 'Welcome to Web3 BootStrap App', name:null });
});

router.get('/page4', function(req, res, next) {
  res.render('page4', { title: 'Welcome to Web3 BootStrap App', name:null });
});


router.get('/page5', function(req, res, next) {
  res.render('page5', { title: 'Welcome to Web3 BootStrap App', name:null });
});

router.get('/page6', function(req, res, next) {
  res.render('page6', { title: 'Welcome to Web3 BootStrap App', name:null });
});



module.exports = router;
