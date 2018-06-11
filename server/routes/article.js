const router = require('koa-router')();
const db = require('../database');
const login = require('../middlewares/isLogin');
const xss = require('xss');

// 获取文章列表
router.get('/list', async (ctx) => {
	const page = ctx.query.page || '1';
	const limit = ctx.query.limit || '10';
	const data = await getList(page, limit);
	const count = await getListCount();
	ctx.success('0000', '获取成功', {
		list: data,
		total: count,
	});
});

function getList(page, limit) {
	return new Promise(function (resolve, reject) {
		db.query('select a.id,a.title,a.watch,a.intro,a.time,a.top,b.title as tag_name , b.color from article as a left join tag as b on a.tagid = b.id where a.state = 1 order by a.top desc limit ' + (page - 1) * limit + ' , ' + limit, function (err, row) {
			if (err) {
				reject(err);
			} else {
				resolve(row);
			}
		});
	});
}

function getListCount() {
	return new Promise(function (resolve, reject) {
		db.query('select count(*) from article where state = 1', function (err, row) {
			if (err) {
				reject(err);
			} else {
				resolve(row[0]['count(*)']);
			}
		});
	});
}

// 获取文章详情
router.get('/info', async (ctx) => {
	const id = ctx.query.id;
	try {
		const data = await getInfo(id);
		await addWatch(id, data.watch);
		ctx.success('0000', '获取成功', data);
	} catch (err) {
		ctx.throw(err);
	}
});

function getInfo(id) {
	return new Promise(function (resolve, reject) {
		db.query('select * from article where id = ' + id, function (err, row) {
			if (err) {
				reject(err);
			} else {
				resolve(row[0]);
			}
		});
	});
}

function addWatch(id, num) {
	return new Promise(function (resolve, reject) {
		num++;
		db.query('update article set watch = ? where id = ?', [num, id], function (err) {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
}

// 删除文章
router.post('/delete', login.isLogin, async (ctx) => {
	const id = ctx.request.body.id;
	try {
		await deleteArticle(id);
		ctx.success('0000', '删除成功');
	} catch (err) {
		ctx.error('0011', '删除失败');
	}
});

function deleteArticle(id) {
	return new Promise(function (resolve, reject) {
		db.query('update article set state = 0 where id = ?', [id], function (err) {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
}

// 添加文章
router.post('/add', login.isLogin, async (ctx) => {
	const title = ctx.request.body.title;
	const intro = ctx.request.body.intro;
	const content = ctx.request.body.content;
	const time = new Date();
	const tagId = ctx.request.body.tagId;
	try {
		await addArticle(title, intro, content, time, tagId);
		ctx.success('0000', '添加成功');
	} catch (err) {
		ctx.error('0011', '添加失败');
	}
});

function addArticle(title, intro, content, time, tagId) {
	return new Promise(function (resolve, reject) {
		db.query('insert into article (title,intro,content,time,tagid) values(?,?,?,?,?)', [title, intro, content, time, tagId], function (err, rows) {
			if (rows.insertId) {
				resolve();
			} else {
				reject(err);
			}
		});
	});
}

// 获取文章标签
router.get('/tag', async (ctx) => {
	const list = await getTag();
	ctx.success('0000', '获取成功', list);
});

function getTag() {
	return new Promise(function (resolve, reject) {
		db.query('select * from tag where state = 1', function (err, rows) {
			if (err) {
				reject(err);
			} else {
				resolve(rows);
			}
		});
	});
}

// 添加文章标签
router.post('/tag', async (ctx) => {
	const title = ctx.request.body.title;
	const color = ctx.request.body.color;

	try {
		await addTag(title, color);
		ctx.success('0000', '添加成功');
	} catch (err) {
		ctx.error('0011', '添加失败');
	}
});

function addTag(title, color) {
	return new Promise(function (resolve, reject) {
		db.query('insert into tag (title,color) values(?,?)', [title, color], function (err, rows) {
			if (rows.insertId) {
				resolve();
			} else {
				reject(err);
			}
		});
	});
}

// 删除文章标签
router.post('/tag/delete', login.isLogin, async (ctx) => {
	const id = ctx.request.body.id;
	try {
		await deleteTag(id);
		ctx.success('0000', '删除成功');
	} catch (err) {
		ctx.error('0011', '删除失败');
	}
});

function deleteTag(id) {
	return new Promise(function (resolve, reject) {
		db.query('update tag set state = 0 where id = ?', [id], function (err) {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
}

// 设置文章置顶
router.post('/top', login.isLogin, async (ctx) => {
	const id = ctx.request.body.id;
	const top = ctx.request.body.top;
	try {
		await setTop(top, id);
		ctx.success('0000', '设置成功');
	} catch (err) {
		ctx.error('0011', '设置失败');
	}
});

function setTop(top, id) {
	return new Promise(function (resolve, reject) {
		db.query('update article set top = ? where id = ?', [top, id], function (err) {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
}

// 更新文章
router.post('/update', login.isLogin, async (ctx) => {
	const id = ctx.request.body.id;
	const title = ctx.request.body.title;
	const intro = ctx.request.body.intro;
	const content = ctx.request.body.content;
	const tagId = ctx.request.body.tagId;
	try {
		await updateArticle(title, intro, content, tagId, id);
		ctx.success('0000', '更新成功');
	} catch (err) {
		ctx.error('0011', '更新失败', {
			msg: err,
		});
	}
});

function updateArticle(title, intro, content, tagId, id) {
	return new Promise(function (resolve, reject) {
		db.query('update article set title = ?,intro = ?,content = ?,tagid = ? where id = ?', [title, intro, content, tagId, id], function (err) {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
}

// 添加文章评论
router.post('/comment', async (ctx) => {
	const id = ctx.request.body.id;
	const name = xss(ctx.request.body.name) || '匿名';
	const content = xss(ctx.request.body.content);
	const time = new Date();
	const ip = ctx.request.ip.substring(0, 6) + '**';
	if (DataLength(name) > 12 || DataLength(content) > 1000) {
		ctx.error('0011', '字数超过限制');
	} else {
		try {
			await addComment(`${name} (${ip})`, content, id, time);
			ctx.success('0000', '添加成功');
		} catch (err) {
			ctx.error('0011', '添加失败');
		}
	}
});

function DataLength(fData) {
	let intLength = 0;
	for (let i = 0; i < fData.length; i++) {
		if ((fData.charCodeAt(i) < 0) || (fData.charCodeAt(i) > 255)) {
			intLength += 2;
		} else {
			intLength += 1;
		}
	}
	return intLength;
}

function addComment(name, content, aid, time) {
	return new Promise(function (resolve, reject) {
		db.query('insert into comment (name,content,aid,time) values(?,?,?,?)', [name, content, aid, time], function (err, rows) {
			if (rows.insertId) {
				resolve();
			} else {
				reject(err);
			}
		});
	});
}

// 获取文章评论
router.get('/comment', async (ctx) => {
	const id = ctx.query.id;
	try {
		const rows = await getCommentList(id);
		ctx.success('0000', '获取成功', rows);
	} catch (err) {
		ctx.error('0011', '获取失败');
	}
});

function getCommentList(id) {
	return new Promise(function (resolve, reject) {
		db.query('select * from comment where aid = ' + id, function (err, rows) {
			if (err) {
				reject(err);
			} else {
				resolve(rows);
			}
		});
	});
}

module.exports = router;
