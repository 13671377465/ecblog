var blog = {
	insert:'INSERT INTO blog(id, tag, title, text, time) VALUES(0,?,?,?,?)',
	update:'update blog set tag=?, title=?, text=? where id=?',
	delete: 'delete from blog where id=?',
	queryById: 'select * from blog where id=?',
	queryAll: 'select * from blog'
}

module.exports = blog