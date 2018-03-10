const router = require('koa-router')();
const request = require('request')

let options = {
	url: '',
	headers: {
        'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
	}
};

router.get('/sell',async (ctx) => {
    let data = await( new Promise ((resolve,reject) => {
	    options.url = 'https://api-m.mtime.cn/PageSubArea/HotPlayMovies.api?locationId=974'
        request(options,function(error, response, body){
            resolve(JSON.parse(body))
        })
    }))
    ctx.success('0000','获取成功',data)
})

router.get('/hot',async (ctx) => {
    let data = await( new Promise ((resolve,reject) => {
	    options.url = 'https://api-m.mtime.cn/Showtime/LocationMovies.api?locationId=974'
        request(options,function(error, response, body){
            resolve(JSON.parse(body))
        })
    }))
    ctx.success('0000','获取成功',data)
})
router.get('/soon',async (ctx) => {
	options.url = 'https://api-m.mtime.cn/Movie/MovieComingNew.api?locationId=974'
    let data = await( new Promise ((resolve,reject) => {
        request(options,function(error, response, body){
            resolve(JSON.parse(body))
        })
    }))
    ctx.success('0000','获取成功',data)
})
router.get('/info', async (ctx) => {
    let id = ctx.query.id
    let info = new Promise((resolve,reject) => {
	    options.url = `https://ticket-api-m.mtime.cn/movie/detail.api?locationId=974&movieId=${id}`
	    request(options,function (error, response, body) {
		    resolve(JSON.parse(body).data)
	    })
    })
    let performer = new Promise((resolve,reject) => {
	    options.url = `https://api-m.mtime.cn/Movie/MovieCreditsWithTypes.api?movieId=${id}`
	    request(options,function (error, response, body) {
		    resolve(JSON.parse(body).types)
	    })
    })
    let comment = new Promise((resolve,reject) => {
	    options.url = `https://ticket-api-m.mtime.cn/movie/hotComment.api?movieId=${id}`
	    request(options,function (error, response, body) {
		    resolve(JSON.parse(body).data)
	    })
    })
    let tidbits = new Promise((resolve,reject) => {
	    options.url = `https://api-m.mtime.cn/Movie/Video.api?pageIndex=1&movieId=${id}`
	    request(options,function (error, response, body) {
		    resolve(JSON.parse(body).videoList)
	    })
    })
    let photo = new Promise((resolve,reject) => {
	    options.url = `https://api-m.mtime.cn/Movie/ImageAll.api?movieId=${id}`
	    request(options,function (error, response, body) {
		    resolve(JSON.parse(body).images)
	    })
    })
    let data = await(Promise.all([info,performer,comment,tidbits,photo]))
    
    ctx.success('0000','获取成功',{
		info:data[0],
		performer:data[1],
		comment:data[2],
		tidbits:data[3],
		photo:data[4]
    })
})
module.exports = router;