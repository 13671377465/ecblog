var project = {
	insert:'INSERT INTO project(id, bgimg, title, text, time) VALUES(0,?,?,?,?)',
	update:'update project set bgimg=?, title=?, text=? where id=?',
	delete: 'delete from project where id=?',
	queryById: 'select * from project where id=?',
	queryAll: 'select * from project'
}

module.exports = project