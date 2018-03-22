const router = require('koa-router')();
const db = require('../database');
const login = require('../middlewares/isLogin')

module.exports = router;

router.post('/content',login.isLogin,async (ctx) => {
    let word = ctx.request.body.word
    await (new Promise((resolve,reject) => {
        db.query('update base set word = ? where id = 1',[word], (err,rows) => {
			if(err){
				reject(err)
			}else{
				resolve()
			}
		})
    }))
    ctx.success('0000','操作成功')
})

router.get('/content',async (ctx) => {
    let data = await (new Promise((resolve,reject) => {
        db.query('select * from base',(err,row) => {
            resolve(row)
        })
    }))
    ctx.success('0000','获取成功',data[0])
})