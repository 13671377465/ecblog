var express = require('express'),
    router = express.Router(),
    Project = require('../modules/project.js'),
    crypto = require('crypto'),
    util = require('../util/util')

router.get('/', function(req, res) {
    Project.prototype.projectseleteall(function(projects) {
      	res.render('projects', {projects : projects})
    })
})

router.post('/', function(req, res) {
    res.redirect('/mainpro')
})

router.get('/article', function(req, res) {
	Project.prototype.projectselete(req.query.id, function (projects) {
            res.render('proarticle', {projects : projects})
    })  
})

module.exports = router