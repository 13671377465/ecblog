var express = require('express'),
    router = express.Router(),
    Blog = require('../modules/blog.js'),
    crypto = require('crypto'),
    util = require('../util/util'),
    markdown = require( "markdown" ).markdown

router.get('/', function(req, res) {
    util.checkLogin(req, res, function(req, res) {
        Blog.prototype.blogseleteall(function(blogs) {
            res.render('blog', {blogs : blogs})
        })
    }, function(req, res) {
      res.redirect('/login')
    })
})

router.post('/', function(req, res) {
	var choose = req.body['deletechoose']
	if (Array.isArray(choose)) {
		choose.map(function(value, index, arr) {
			Blog.prototype.blogdelete(value)
			if(index === arr.length - 1) {
				res.redirect('/blog')
			}
		})
	}else {
		Blog.prototype.blogdelete(choose, function() {
			res.redirect('/blog')
		})
	}
})

router.get('/blogupdate', function(req, res) {
    util.checkLogin(req, res, function(req, res) {
        Blog.prototype.blogselete(req.query.id, function (blogs) {
           res.render('blog_update', {blogs : blogs})
    })  
    } , function(req, res) {
      res.redirect('/login')
    })    
})

router.post('/blogupdate',function(req, res) {
	var title = req.body['title'],
        tag = req.body['tag'],
        text = markdown.toHTML(req.body['text'])
        Blog.prototype.blogupdate(tag, title, text, req.query.id, function() {
        	res.redirect('/blog')
        })
})

router.get('/bloginsert', function(req, res) {
    util.checkLogin(req, res,function(req, res) {
        res.render('blog_add')
    }, function(req, res) {
      res.redirect('/login')
    })    
})

router.post('/bloginsert',function(req, res) {
	var title = req.body['title'],
        tag = req.body['tag'],
        text = markdown.toHTML(req.body['text']),
        now = new Date(),
        time = now.getFullYear() + '-' + (now.getMonth()+1) + '-' + now.getDate() 
        Blog.prototype.bloginsert(tag, title, text, time, function() {
        	res.redirect('/blog')
        })
})

module.exports = router
