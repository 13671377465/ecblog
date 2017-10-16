var express = require('express'),
    router = express.Router(),
    crypto = require('crypto')

router.get('/', function(req, res) {
    var express = require('express'),
         router = express.Router()
    req.session.destroy()
    res.redirect('/login')
})

module.exports = router
