var express = require('express'),
    router = express.Router(),
    Blog = require('../modules/blog.js'),
    crypto = require('crypto'),
    util = require('../util/util')
    

router.get('/', function(req, res) {
    Blog.prototype.blogseleteall(function(blogs) {
        res.render('main', {blogs : blogs})
    })
})

router.post('/', function(req, res) {
    res.redirect('/')
})

router.get('/article', function(req, res) {
	Blog.prototype.blogselete(req.query.id, function (blogs) {
        res.render('mainarticle', {blogs : blogs})
    })  
})

module.exports = router