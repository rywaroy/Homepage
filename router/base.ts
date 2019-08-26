import * as Router from 'koa-router';
import isLogin from '../middlewares/isLogin';
import * as request from 'request';
import * as dayjs from 'dayjs';
import Visit from '../model/visit';
import Base from '../model/base';
import IContext from '../interface/context';
import { IBase } from '../interface/base';

const router: Router = new Router();

router.post('/content', isLogin, async (ctx: IContext) => {
	const word = ctx.request.body.word;
	await Base.update({
		word,
	}, {
		where: {
			id: 1,
		},
	});
	ctx.success(200, '操作成功');
});

router.get('/content', async (ctx: IContext) => {
	const data: IBase[] = await Base.findAll();
	const ip: string = ctx.request.header['x-forward-for'];
	if (ip !== '111.231.99.115') {
		let device: string = '';
		const deviceAgent: string = ctx.request.headers['user-agent'].toLowerCase();
		if (deviceAgent.indexOf('ipad') > -1) {
			device = 'ipad';
		} else if (deviceAgent.indexOf('iphone') > -1) {
			device = 'iphone';
		} else if (deviceAgent.indexOf('android') > -1) {
			device = 'android';
		} else {
			device = 'pc';
		}
		try {
			const rs: any = await getIpInfo(ip);
			const rd: any = JSON.parse(rs).data;
			const address: string = rd.country + rd.region + rd.city + rd.isp;
			await Visit.create({
				ip,
				time: new Date(),
				address,
				device,
			});
			ctx.success(200, '获取成功', data[0]);
		} catch {
			await Visit.create({
				ip,
				time: new Date(),
				address: '',
				device,
			});
			ctx.success(200, '获取成功', data[0]);
		}
	} else {
		ctx.success(200, '获取成功', data[0]);
	}
});

function getIpInfo(ip: string) {
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

router.get('/visit', isLogin, async (ctx: IContext) => {
	const date: string = dayjs(new Date()).format('YYYY-MM-DD');
	const count = await Visit.findOne({
		attributes: [
			['count(*)', 'total'],
			[`sum(IF(time = '${date}', 1, 0))`, 'date'],
			['sum(IF(device = "ipad", 1, 0))', 'ipad'],
			['sum(IF(device = "iphone", 1, 0))', 'iphone'],
			['sum(IF(device = "android", 1, 0))', 'android'],
			['sum(IF(device = "pc", 1, 0))', 'pc'],
		],
	});
	ctx.success(200, '获取成功', count);
});

export default router;