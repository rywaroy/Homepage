const router = require('koa-router')();
const request = require('request')

let options = {
	url: '',
	headers: {
		'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
	}
};
router.get('/list', async ctx => {
	let page = ctx.query.page || 1;
	let limit = ctx.query.limit || 10;
	let city = ctx.query.city || '杭州'
	let start = (page - 1) * limit
	options.url = `https://api.douban.com/v2/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b&city=${city}&start=${start}&count=${limit}&client=&udid=`
	let data = await( new Promise ((resolve,reject) => {
		request(options,function (error, response, body) {
			resolve(body)
		})
	}))
	ctx.body = data
})

router.get('/info', async (ctx) => {
	let id = ctx.query.id;
	let intro = new Promise((resolve,reject) => {
		options.url = `http://api.douban.com/v2/movie/subject/${id}?apikey=0b2bdeda43b5688921839c8ecb20399b&city=&client=&udid=`
		request(options,function (error, response, body) {
			// console.log(response)
			resolve(JSON.parse(body))
		})
	})
	let data = await(Promise.all([intro]))
	ctx.body = {
		intro:data[0],
	}
})

router.get('/image', async (ctx) => {
	let id = ctx.query.id;
	let page = ctx.query.page
	let limit = ctx.query.limit
	let start = (page - 1) * limit
	let count = page * limit
	let data = await( new Promise((resolve,reject) => {
		options.url = `http://api.douban.com/v2/movie/subject/${id}/photos?apikey=0b2bdeda43b5688921839c8ecb20399b&start=${start}&count=${count}&client=&udid=`
		request(options,function (error, response, body) {
			// console.log(response)
			resolve(JSON.parse(body))
		})
	}))
	ctx.body = data
})

router.get('/comment', async (ctx) => {
	let id = ctx.query.id;
	let page = ctx.query.page
	let limit = ctx.query.limit
	let start = (page - 1) * limit
	let data = await( new Promise((resolve,reject) => {
		options.url = `http://api.douban.com/v2/movie/subject/${id}/comments?apikey=0b2bdeda43b5688921839c8ecb20399b&start=${start}&count=${limit}&client=&udid=`
		request(options,function (error, response, body) {
			// console.log(response)
			resolve(JSON.parse(body))
		})
	}))
	ctx.body = data
})


module.exports = router;
