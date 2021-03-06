
import IContext from '../interface/context';
import Admin from '../model/admin';
import { IMiddleware } from 'koa-router'

const isLogin: IMiddleware = async function (ctx: IContext, next: () => Promise<any>) {
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

export default isLogin;
