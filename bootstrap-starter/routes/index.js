var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Welcome to Web3 BootStrap App',
    name: null,
    currentPage: 'home'
  });
});

router.get('/about', function(req, res, next) {
  res.render('page1', {
    title: 'Welcome to Web3 BootStrap App',
    name: null,
    currentPage: 'about'
  });
});

router.get('/Get-Verified', function(req, res, next) {
  res.render('page2', {
    title: 'Welcome to Web3 BootStrap App',
    name: null,
    currentPage: 'get-verified'
  });
});

router.get('/Universities', function(req, res, next) {
  res.render('page3', {
    title: 'Welcome to Web3 BootStrap App',
    name: null,
    currentPage: 'universities'
  });
});

router.get('/brands', function(req, res, next) {
  res.render('page4', {
    title: 'Welcome to Web3 BootStrap App',
    name: null,
    currentPage: 'brands'
  });
});

router.get('/contact', function(req, res, next) {
  res.render('page5', {
    title: 'Welcome to Web3 BootStrap App',
    name: null,
    currentPage: 'contact'
  });
});



module.exports = router;
