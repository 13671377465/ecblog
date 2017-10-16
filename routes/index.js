var express = require('express'),
    router = express.Router(),
    util = require('../util/util')

router.get('/', function(req, res) {
  util.checkLogin(req, res, function(req, res) {
        res.render('index')
    }, function() {
      res.redirect('/login')
    })  
})

module.exports = router