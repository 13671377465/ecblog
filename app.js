var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')
var mysql = require('mysql')
var index = require('./routes/index')
var login = require('./routes/login')
var loginout = require('./routes/loginout')
var blog = require('./routes/blogs')
var project = require('./routes/projects')

var app = express()

app.use(cookieParser('ec'))
app.use(session({ 
	secret: 'ec',
	resave: true,
  saveUninitialized: true}
))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')
app.engine('.html', require('ejs').__express)

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)
app.use('/login', login)
app.use('/loginout', loginout)
app.use('/blog', blog)
app.use('/project', project)

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

module.exports = app
