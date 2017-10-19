var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')
var mysql = require('mysql')
var http = require('http')
// 后台
var index = require('./routes/index')
var login = require('./routes/login')
var loginout = require('./routes/loginout')
var blog = require('./routes/blogs')
var project = require('./routes/projects')
// 前台
var main = require('./routes/main')
var mainpro = require('./routes/mainpro') 

var app = express()

app.use(cookieParser('ec'))
app.use(session({ 
	secret: 'ec',
	resave: true,
  saveUninitialized: true}
))

app.set('port', process.env.PORT || 8080)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')
app.engine('.html', require('ejs').__express)

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// 后台
app.use('/index', index)
app.use('/login', login)
app.use('/loginout', loginout)
app.use('/blog', blog)
app.use('/project', project)
// 前台
app.use('/', main)
app.use('/mainpro', mainpro)

app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})


app.use(function(err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'))
})

module.exports = app
