var mysql = require('mysql')
var conf = require('../conf/db')
var util = require('../util/util')
var sql = require('../dao/projectSqlMapping')

var pool  = mysql.createPool(util.extend({}, conf.mysql))

function Project(project){
    this.bgimg = project.bgimg
    this.title = project.title
    this.text = project.text
    this.time = project.time
}

Project.prototype.projectinsert = function projectinsert(bgimg, title, text, time, callback) {
    pool.getConnection(function(err, connection) {
    connection.query(sql.insert, [bgimg, title, text, time], function (err,result) {
            if (err) {
                console.log("insertproject_Sql Error: " + err.message)
                return
            }
            connection.release()
            callback()
        })                 
    }) 
}

Project.prototype.projectdelete = function projectdelete(id) {
    pool.getConnection(function(err, connection) {
        connection.query(sql.delete, [id], function (err) {
            if (err) {
                console.log("projectdelete Error: " + err.message)
                return
            }
            connection.release()               
        }) 
    })     
}

Project.prototype.projectselete = function projectselete(id, callback) {
        pool.getConnection(function(err, connection) {
        connection.query(sql.queryById, [id], function (err, result) {
            connection.release()
            if (err) {
                console.log("projectselete Error: " + err.message)
                return
            }
            callback(result)                  
        })
    })    
}

Project.prototype.projectseleteall = function projectseleteall(callback) {
        pool.getConnection(function(err, connection) {
        connection.query(sql.queryAll, function (err, result) {
            connection.release()
            if (err) {
                console.log("projectseleteall Error: " + err.message)
                return
            }
            callback(result)                  
        })
    })    
}

Project.prototype.projectupdate = function projectupdate(bgimg, title, text, id, callback) {
    pool.getConnection(function(err, connection) {
        connection.query(sql.update, [bgimg, title, text, id], function (err, result) {
            connection.release()
            if (err) {
                console.log("projectupdate Error: " + err.message)
                return
            }
            callback()                  
        })
    })    
}
module.exports = Project