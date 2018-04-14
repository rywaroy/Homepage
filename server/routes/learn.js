const router = require('koa-router')();
const db = require('../database');
const login = require('../middlewares/isLogin')

//获取文章列表
router.get('/list',async(ctx) => {
    let page = ctx.query.page || '1'
    let limit = ctx.query.limit || '10'
    let data = await (new Promise((resolve,reject) => {
        db.query('select id,title,intro,time,tag from learn where state = 1 limit ' +  (page-1) * limit + ' , ' + limit,function (err,row) {
            if (err) {
                reject(err)
            } else {
                resolve(row)
            }
        })
    }))
	let count = await (new Promise((resolve,reject) => {
        db.query('select count(*) from learn where state = 1', function (err, row) {
			if (err) {
				reject(err)
			} else {
				resolve(row[0]['count(*)'])
			}
		})
    }))
    ctx.success('0000','获取成功',{list:data,total:count})
    // ctx.body = data;
})

//获取文章详情
router.get('/info', async(ctx) => {
    let id = ctx.query.id
    try{
		let data = await (new Promise((resolve,reject) => {
            db.query('select * from learn where id = ' + id, function (err, row) {
                if (err) {
                    reject(err)
                } else {
                    resolve(row[0])
                }
            })
        }))
	    ctx.success('0000','获取成功',data)
    }catch(err) {
        ctx.throw(err)
    }
})

//删除文章
router.post('/delete',login.isLogin,async(ctx) => {
	let id = ctx.request.body.id
	try {
		await (new Promise((resolve,reject) => {
            db.query('update learn set state = 0 where id = ?',[id],function (err,rows) {
                if(err){
                    reject(err)
                }else{
                    resolve()
                }
            })
        }))
		ctx.success('0000','删除成功')
	}catch(err){
		ctx.error('0011','删除失败')
	}
	
})

//添加文章
router.post('/add',login.isLogin,async(ctx) => {
	let title = ctx.request.body.title;
	let intro = ctx.request.body.intro;
    let html = ctx.request.body.html;
    let md = ctx.request.body.md;
	let time = new Date();
	let tag = ctx.request.body.tag;
    console.log(html)
	try {
		await (new Promise((resolve,reject) => {
            db.query('insert into learn (title,intro,html,md,time,tag) values(?,?,?,?,?,?)',[title,intro,html,md,time,tag],function (err,rows) {
                if (rows.insertId) {
                    resolve()
                } else {
                    reject(err)
                }
            })
        }))
		ctx.success('0000','添加成功')
	}catch (err){
		ctx.error('0011','添加失败')
	}

})

//更新文章
router.post('/update',login.isLogin, async(ctx) =>{
	let id = ctx.request.body.id;
	let title = ctx.request.body.title;
	let intro = ctx.request.body.intro;
    let html = ctx.request.body.html;
    let md = ctx.request.body.md;
	let tag = ctx.request.body.tag;
	try {
		await (new Promise((resolve,reject) => {
            db.query('update learn set title = ?,intro = ?,html = ?,md = ?,tag = ? where id = ?',[title,intro,html,md,tag,id],function (err,rows) {
                if(err){
                    reject(err)
                }else{
                    resolve()
                }
            })
        }))
		ctx.success('0000','更新成功')
	}catch (err){
		ctx.error('0011','更新失败',{msg:err})
	}
	
})

module.exports = router;