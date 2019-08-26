import * as Router from 'koa-router';
import * as uuid from 'uuid';
import * as request from 'request';
import Admin from '../model/admin';
import IContext from '../interface/context';
import { IAdmin } from '../interface/admin';

const router: Router = new Router();

router.post('/login', async (ctx: IContext) => {
	const {
		account,
		password
	}: {
		account: string,
		password: string
	} = ctx.request.body;
	if (!account || !password) {
		ctx.error(400, '请输入账号或密码');
		return;
	}

	const data: IAdmin = await Admin.findOne({
		where: {
			account,
			password,
		},
	});
	if (!data) {
		ctx.error(400, '账号或密码错误');
		return;
	}
	const time: object = new Date();
	const token: string = uuid.v4();
	try {
		const rs: any = await getIpInfo(ctx.request.header['x-forward-for']);
		const rd: any = JSON.parse(rs).data;
		const location: string = rd.country + rd.region + rd.city;
		await Admin.update({
			token,
			last_location: data.location,
			last_time: data.time,
			location,
			time,
		}, {
			where: {
				id: data.id,
			},
		});
		data.token = token;
		ctx.success(200, '登录成功', data);
	} catch {
		await Admin.update({
			token,
			last_location: data.location,
			last_time: data.time,
			location: '未知',
			time: '未知',
		}, {
			where: {
				id: data.id,
			},
		});
		data.token = token;
		ctx.success(200, '登录成功', data);
	}
	
	
	
	
});

function getIpInfo(ip: number) {
	return new Promise((resolve, reject) => {
		request.get(`http://ip.taobao.com/service/getIpInfo.php?ip=${ip}`, function (error, response, body) {
			if (error) {
				reject(error);
			} else {
				resolve(body);
			}
		});
	});
}

export default router;