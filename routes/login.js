var express = require('express'),
    router = express.Router(),
    User = require('../modules/user.js'),
    crypto = require('crypto')

router.get('/', function(req, res) {
    res.render("login");           
})

router.post('/', function(req, res) {
    var userName = req.body['username'],
        userPwd = req.body['password'],
        isRem = req.body['chbRem'],
        md5 = crypto.createHash('md5')
       
    User.prototype.getUserByUserName(userName, function (results) {                            
        if(results == '') {
            res.locals.error = '用户不存在'
            res.render('login')
            return
         }

         userPwd = md5.update(userPwd).digest('hex')
         if(results[0].username != userName || results[0].password != userPwd) {
             res.locals.error = '用户名或密码有误'
             res.render('login')
             return
         }
         else {
             if(isRem) {
                res.cookie('username', userName, { maxAge: 60000 })             
             }
             res.locals.username = userName
             req.session.username = res.locals.username                   
             res.redirect('/index')
             return
        }     
    })           
})

module.exports = router
