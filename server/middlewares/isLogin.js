const db = require('../database');


exports.isLogin = async function (ctx, next) {
	const token = ctx.request.body.token || ctx.query.token;
	if (!token) {
		ctx.error('0014', '暂无权限');
	} else {
		const data = await checkToken(token);

		if (data.length === 1) {
			await next();
		} else {
			ctx.error('0014', '登录失效');
		}
	}
};

function checkToken(token) {
	return new Promise(function (resolve, reject) {
		db.query('select * from admin where token = "' + token + '"', function (err, row) {
			if (err) {
				reject(err);
			} else {
				resolve(row);
			}
		});
	});
}