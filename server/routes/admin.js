const router = require('koa-router')();
const db = require('../database');
const uuid = require('uuid');

router.post('/login', async (ctx) => {
	const account = ctx.request.body.account;
	const password = ctx.request.body.password;
	const data = await findAdmin(account, password);

	if (data.length === 1) {
		const token = await setToken(account, password);
		data[0].token = token;
		ctx.success('0000', '登录成功', data[0]);
	} else {
		ctx.error('0011', '账户或密码错误');
	}
});

function findAdmin(account, password) {
	return new Promise(function (resolve, reject) {
		db.query('select * from admin where account = "' + account + '" and password = "' + password + '"', function (err, rows) {
			if (err) {
				reject(err);
			} else {
				resolve(rows);
			}
		});
	});
}

function setToken(account, password) {
	return new Promise(function (resolve, reject) {
		const token = uuid.v4();
		db.query('update admin set token = "' + token + '" where account = "' + account + '" and password = "' + password + '"', function (err) {
			if (err) {
				reject(err);
			} else {
				resolve(token);
			}
		});
	});
}

module.exports = router;
