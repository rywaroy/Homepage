const router = require('koa-router')();
const db = require('../database');
const login = require('../middlewares/isLogin')
router.post('/album',login.isLogin,async (ctx) => {
    let url = ctx.request.body.url
    let title = ctx.request.body.title
    await (new Promise((resolve,reject) => {
        db.query('insert into album (title,img) values(?,?)',[title,url],function (err,rows) {
            if (rows.insertId) {
				resolve()
			} else {
				reject(err)
			}
		})
    }))
    ctx.success('0000','添加成功')
})

router.get('/album',async (ctx) => {
    let data = await (new Promise((resolve,reject) => {
        db.query('select * from album',function(err,rows){
            if(err) throw err;
            resolve(rows)
        })
    }))
    ctx.success('0000','获取成功',data)
})

router.post('/group',login.isLogin,async (ctx) => {
    let url = ctx.request.body.url
    let id = ctx.request.body.id
    await (new Promise((resolve,reject) => {
        db.query('insert into album_group (url,album_id) values(?,?)',[url,id],function (err,rows) {
            if (rows.insertId) {
				resolve()
			} else {
				reject(err)
			}
		})
    }))
    ctx.success('0000','添加成功')
})

router.get('/group',async (ctx) => {
    let id = ctx.query.id
    let data = await (new Promise((resolve,reject) => {
        db.query('select * from album_group where album_id = ?',[id],function(err,rows){
            if(err) throw err;
            resolve(rows)
        })
    }))
    ctx.success('0000','获取成功',data)
})

module.exports = router;