const router = require('koa-router')();
const uuid = require('uuid');
const request = require('request');
const Admin = require('../model/admin');

router.post('/login', async (ctx) => {
	const account = ctx.request.body.account;
	const password = ctx.request.body.password;
	if (!account || !password) {
		ctx.error(400, '请输入账号或密码');
		return;
	}

	const data = await Admin.findOne({
		where: {
			account,
			password,
		},
	});
	if (!data) {
		ctx.error(400, '账号或密码错误');
		return;
	}
	const rs = await getIpInfo(ctx.request.header['x-forward-for']);
	const rd = JSON.parse(rs).data;
	const location = rd.country + rd.region + rd.city;
	const time = new Date();
	const token = uuid.v4();
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

module.exports = router;
