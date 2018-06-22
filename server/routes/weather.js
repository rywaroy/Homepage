const router = require('koa-router')();
const request = require('request');

const options = {
	url: '',
	headers: {
		'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
	},
};

router.get('/all', async ctx => {
	const city = ctx.query.city || 'CHZJ000000';
	options.url = `http://tj.nineton.cn/Heart/index/all?city=${city}&language=zh-chs&unit=c&aqi=city&alarm=1&key=78928e706123c1a8f1766f062bc8676b`;
	const data = await (new Promise((resolve, reject) => {
		request(options, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				resolve(JSON.parse(body));
			} else {
				reject();
			}
		});
	}));
	ctx.success('0000', '获取成功', data);
});

module.exports = router;
