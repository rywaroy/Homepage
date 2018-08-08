const router = require('koa-router')();
const db = require('../database');
const login = require('../middlewares/isLogin');
const request = require('request');

module.exports = router;

router.post('/content', login.isLogin, async (ctx) => {
	const word = ctx.request.body.word;
	await (new Promise((resolve, reject) => {
		db.query('update base set word = ? where id = 1', [word], (err) => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	}));
	ctx.success('0000', '操作成功');
});

router.get('/content', async (ctx) => {
	const data = await (new Promise((resolve) => {
		db.query('select * from base', (err, row) => {
			resolve(row);
		});
	}));
	console.log(ctx.ip);
	const ip = ctx.request.header['x-forward-for'];
	const rs = await getIpInfo(ip);
	const rd = JSON.parse(rs).data;
	const address = rd.country + rd.region + rd.city + rd.isp;
	await (new Promise((resolve, reject) => {
		db.query('insert into visit (ip, time, address) values(?,?,?)', [ip, new Date(), address], (err, rows) => {
			if (rows.insertId) {
				resolve();
			} else {
				reject(err);
			}
		});
	}));
	ctx.success('0000', '获取成功', data[0]);
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
