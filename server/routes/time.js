
const router = require('koa-router')();
const request = require('request')
router.get('/sell',async (ctx) => {
    let data = await( new Promise ((resolve,reject) => {
        request('https://api-m.mtime.cn/PageSubArea/HotPlayMovies.api?locationId=974',function(error, response, body){
            resolve(body)
        })
    }))
    ctx.body = data
})

router.get('/hot',async (ctx) => {
    let data = await( new Promise ((resolve,reject) => {
        request('https://api-m.mtime.cn/Showtime/LocationMovies.api?locationId=974',function(error, response, body){
            resolve(body)
        })
    }))
    ctx.body = data
})
router.get('/soon',async (ctx) => {
    let data = await( new Promise ((resolve,reject) => {
        request('https://api-m.mtime.cn/Movie/MovieComingNew.api?locationId=974',function(error, response, body){
            resolve(body)
        })
    }))
    ctx.body = data
})
module.exports = router;