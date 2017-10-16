var user = {
	insert:'INSERT INTO user(id, username, password) VALUES(0,?,?)',
	update:'update user set username=?, password=? where id=?',
	delete: 'delete from user where id=?',
	queryById: 'select * from user where id=?',
	queryAll: 'select * from user',
	getUserNumByName: 'SELECT COUNT(1) AS num FROM user WHERE username = ?',
	getUserByUserName: 'SELECT * FROM user WHERE username = ?'
}

module.exports = user