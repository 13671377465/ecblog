
module.exports = {
    extend: function(target, source, flag) {    // 用于方便创建连接池
        for(var key in source) {
            if(source.hasOwnProperty(key))
                flag ?
                    (target[key] = source[key]) :
                    (target[key] === void 0 && (target[key] = source[key]));
        }
        return target;
    },
    checkLogin: function(req, res, cb1, cb2) {    //使用cookie和session用于检查是否登录，登录执行cb1，否则执行cb2
    	if(req.cookies.username) { 
	      	console.log('cookies:' + req.cookies.username)
	       	req.session.username = req.cookies.username
            cb1(req, res)
	  	}  
	  	if(req.session.username) {    
	        console.log('session:' + req.session.username)
	        res.locals.username = req.session.username
            cb1(req, res)
	  	}
	  	else {
	        cb2(req, res)
            return
	    }
    }    
}