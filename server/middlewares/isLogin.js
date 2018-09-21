const Admin = require('../model/admin');


exports.isLogin = async function (ctx, next) {
	const token = ctx.request.header.authorization;
	if (!token) {
		ctx.error(403, '暂无权限');
	} else {
		const data = await Admin.findOne({
			where: {
				token,
			},
		});
		if (data) {
			await next();
		} else {
			ctx.error(401, '登录失效');
		}
	}
};
