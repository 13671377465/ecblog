var mysql = require('mysql')
var conf = require('../conf/db')
var util = require('../util/util')
var sql = require('../dao/userSqlMapping')

var pool  = mysql.createPool(util.extend({}, conf.mysql))

function User(user){
    this.username = user.username
    this.password = user.password
}

pool.getConnection(function(err, connection) {
    var useDbSql = "USE " + conf.mysql.database;
    connection.query(useDbSql, function (err) {
         if (err) {
            console.log("USE Error: " + err.message)
            return
         }
         console.log('USE 连接成功')
    })
})

User.prototype.save = function save(callback) {
    var user = {
        username: this.username,
        password: this.password
    }
    pool.getConnection(function(err, connection) {
    connection.query(sql.insert, [user.username, user.password], function (err,result) {
            if (err) {
                console.log("insertUser_Sql Error: " + err.message)
                return
            }
            connection.release()
            console.log("invoked[save]")
            callback(result)
        })                 
    }) 
}

    //根据用户名得到用户数量
User.prototype.getUserNumByName = function getUserNumByName(username, callback) {
    pool.getConnection(function(err, connection) {
        connection.query(sql.getUserNumByName, [username], function (err, result) {
            if (err) {
                console.log("getUserNumByName Error: " + err.message)
                return
            }
            connection.release()
            console.log("invoked[getUserNumByName]")
            callback(result)                     
        }) 
    })     
}

    //根据用户名得到用户信息
User.prototype.getUserByUserName = function getUserNumByName(username, callback) {
        pool.getConnection(function(err, connection) {
        connection.query(sql.getUserByUserName, [username], function (err, result) {
            connection.release()
            if (err) {
                console.log("getUserByUserName Error: " + err.message)
                return
            }
            console.log("invoked[getUserByUserName]")
            callback(result)                  
        })
    })    
}
module.exports = User