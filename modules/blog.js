var mysql = require('mysql')
var conf = require('../conf/db')
var util = require('../util/util')
var sql = require('../dao/blogSqlMapping')

var pool  = mysql.createPool(util.extend({}, conf.mysql))

function Blog(blog){
    this.tag = blog.tag
    this.title = blog.title
    this.text = blog.text
    this.time = blog.time
}

Blog.prototype.bloginsert = function bloginsert(tag, title, text, time, callback) {
    pool.getConnection(function(err, connection) {
    connection.query(sql.insert, [tag, title, text, time], function (err,result) {
            if (err) {
                console.log("insertBlog_Sql Error: " + err.message)
                return
            }
            connection.release()
            callback()
        })                 
    }) 
}

Blog.prototype.blogdelete = function blogdelete(id) {
    pool.getConnection(function(err, connection) {
        connection.query(sql.delete, [id], function (err) {
            if (err) {
                console.log("blogdelete Error: " + err.message)
                return
            }
            connection.release()                  
        }) 
    })     
}

Blog.prototype.blogselete = function blogselete(id, callback) {
        pool.getConnection(function(err, connection) {
        connection.query(sql.queryById, [id], function (err, result) {
            connection.release()
            if (err) {
                console.log("blogselete Error: " + err.message)
                return
            }
            callback(result)                  
        })
    })    
}

Blog.prototype.blogseleteall = function blogseleteall(callback) {
        pool.getConnection(function(err, connection) {
        connection.query(sql.queryAll, function (err, result) {
            connection.release()
            if (err) {
                console.log("blogseleteall Error: " + err.message)
                return
            }
            callback(result)                  
        })
    })    
}
    //改
Blog.prototype.blogupdate = function blogupdate(tag, title, text, id, callback) {
    pool.getConnection(function(err, connection) {
        connection.query(sql.update, [tag, title, text, id], function (err, result) {
            connection.release()
            if (err) {
                console.log("blogupdate Error: " + err.message)
                return
            }
            callback()                  
        })
    })    
}
module.exports = Blog