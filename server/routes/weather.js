const router = require('koa-router')();
const request = require('request')

let options = {
	url: '',
	headers: {
		'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
	}
};

router.get('/all', async ctx => {
	let city = ctx.query.city || 'CHZJ000000';
	options.url = `http://tj.nineton.cn/Heart/index/all?city=${city}&language=zh-chs&unit=c&aqi=city&alarm=1&key=78928e706123c1a8f1766f062bc8676b`
	let data = await( new Promise ((resolve,reject) => {
		request(options,function (error, response, body) {
			resolve(body)
		})
	}))
	ctx.body = data
})

module.exports = router;