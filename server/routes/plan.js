const router = require('koa-router')();
const db = require('../database');
const login = require('../middlewares/isLogin');

router.get('/list', async ctx => {
  const data = await (new Promise((resolve, reject) => {
    db.query('select id, title from plan where state = 1', function (err, rows) {
      if (err) {
				reject(err);
			} else {
				resolve(rows);
			}
    });
  }));
  ctx.success('0000', '获取成功', {
		list: data,
	});
});

router.post('/list', login.isLogin, async ctx => {
  const title = ctx.request.body.title;
  try {
    await (new Promise((resolve, reject) => {
      db.query('insert into plan (title) values(?)', [title], function (err, rows) {
        if (rows.insertId) {
					resolve();
				} else {
					reject(err);
				}
      });
    }));
    ctx.success('0000', '添加成功');
  } catch (err) {
    ctx.error('0011', '添加失败');
  }
});

router.post('/list/delete', login.isLogin, async ctx => {
  const id = ctx.request.body.id;
  try {
    await (new Promise((resolve, reject) => {
      db.query('update plan set state = 0 where id = ?', [id], function (err) {
        if (err) {
					reject(err);
				} else {
					resolve();
				}
      });
    }));
    ctx.success('0000', '删除成功');
  } catch (err) {
    ctx.error('0011', '删除失败');
  }
});

module.exports = router;
