const router = require('koa-router')();
const login = require('../middlewares/isLogin');
const request = require('request');
const time = require('js-time.js');
const Visit = require('../model/visit');
const Base = require('../model/base');

router.post('/content', login.isLogin, async (ctx) => {
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

router.get('/content', async (ctx) => {
	const data = await Base.findAll();
	const ip = ctx.request.header['x-forward-for'];
	if (ip !== '111.231.99.115') {
		const rs = await getIpInfo(ip);
		const rd = JSON.parse(rs).data;
		let device = '';
		const address = rd.country + rd.region + rd.city + rd.isp;
		const deviceAgent = ctx.request.headers['user-agent'].toLowerCase();
		if (deviceAgent.indexOf('ipad') > -1) {
			device = 'ipad';
		} else if (deviceAgent.indexOf('iphone') > -1) {
			device = 'iphone';
		} else if (deviceAgent.indexOf('android') > -1) {
			device = 'android';
		} else {
			device = 'pc';
		}
		await Visit.create({
			ip,
			time: new Date(),
			address,
			device,
		});
		ctx.success(200, '获取成功', data[0]);
	} else {
		ctx.success(200, '获取成功', data[0]);
	}
});

function getIpInfo(ip) {
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

router.get('/visit', login.isLogin, async ctx => {
	const date = time(new Date()).format('YYYY-MM-DD');
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

module.exports = router;
