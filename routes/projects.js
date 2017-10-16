var express = require('express'),
    router = express.Router(),
    Project = require('../modules/project.js'),
    crypto = require('crypto'),
    util = require('../util/util'),
    fs = require('fs'),
    multer = require('multer')
var storage = multer.diskStorage({
      destination: function (req, file, cb) {
            cb(null, './public/upload')
       }, 
      filename: function (req, file, cb) {
          var fileFormat = (file.originalname).split(".");
          cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
      }
 }) 
var upload = multer({storage: storage})


router.get('/', function(req, res) {
    util.checkLogin(req, res, function(req, res) {
        Project.prototype.projectseleteall(function(projects) {
        res.render('project', {projects : projects})
      })
    }, function(req, res) {
    	res.redirect('/login')
  	})
})

router.post('/', function(req, res) {
	var choose = req.body['deletechoose']
	if (Array.isArray(choose)) {
		choose.map(function(value, index, arr) {
			Project.prototype.projectdelete(value)
			if(index === arr.length - 1) {
				res.redirect('/project')
			}
		})
	}else {
		Project.prototype.projectdelete(choose, function() {
			res.redirect('/project')
      return
		})
	}
})

router.get('/projectupdate', function(req, res) {
    util.checkLogin(req, res, function(req, res) {
        Project.prototype.projectselete(req.query.id, function (projects) {
        res.render('project_update', {projects : projects})
    })
    }, function(req, res) {
      res.redirect('/login')
    })            
})

router.post('/projectupdate', upload.single('image'), function(req, res) {
    var title = req.body['title'],
        text = req.body['text']
    Project.prototype.projectupdate(req.file.path, title, text, req.query.id, function() {
        res.redirect('/project')
    })
})

router.get('/projectinsert', function(req, res) {
    util.checkLogin(req, res,function(req, res) {
        res.render('project_add')
    } , function(req, res) {
      res.redirect('/login')
    })    
})

router.post('/projectinsert', upload.single('image'),function(req, res) {
    var title = req.body['title'],
        text = req.body['text'],
        time = new Date()
    Project.prototype.projectinsert(req.file.path, title, text, time, function() {
        res.redirect('/project')
    })
})

module.exports = router
