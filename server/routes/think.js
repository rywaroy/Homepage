
const router = require('koa-router')();
const db = require('../database');
const login = require('../middlewares/isLogin');

// 获取说说列表
router.get('/list', async ctx => {
  let page = ctx.query.page || '1'
  let limit = ctx.query.limit || '10'
  let data = await (new Promise((resolve, reject) => {
    db.query('select * from think  where state = 1 limit ' + (page - 1) * limit + ' , ' + limit, function (err, rows) {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  }));

  let count = await (new Promise((resolve, reject) => {
    db.query('select count(*) as count from think  where state = 1', function (err, rows) {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  }));

  for (let item of data) {
    if (item.photos) {
      item.photos = item.photos.split(',');
    } else {
      item.photos = [];
    }
  }

  ctx.success('0000', '获取成功', {
    list: data,
    count: count[0].count,
  })
})

//获取说说详情
router.get('/info', async ctx => {
  let id = ctx.query.id
  let data = await (new Promise((resolve, reject) => {
    db.query('select * from think  where id = ' + id, function (err, rows) {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  }));
  if (data[0].photos) {
    data[0].photos = data[0].photos.split(',');
  } else {
    data[0].photos = [];
  }

  ctx.success('0000', '获取成功', data[0]);
})


//添加说说
router.post('/info', login.isLogin, async ctx => {
  let content = ctx.request.body.content;
	let photos = ctx.request.body.photos;
	let time = new Date();

  try {
    let user = await(new Promise((resolve, reject) => {
      db.query('select name, avatar from admin where account = "admin"', function (err, row) {
        if (err) {
          reject(err)
        } else {
          resolve(row)
        }
      })
    }))
		await (new Promise((resolve, reject) => {
      db.query('insert into think (avatar,name,time,content,photos) values (?,?,?,?,?)', [user[0].avatar,user[0].name,time,content,photos], (err,rows) => {
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

//删除说说
router.post('/delete', login.isLogin, async ctx => {
  let id = ctx.request.body.id;
  try {
		await(new Promise((resolve, reject) => {
      db.query('update think set state = 0 where id = ?', [id] ,function (err, row) {
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

//修改说说
router.post('/edit', login.isLogin, async ctx => {
  let id = ctx.request.body.id;
  let content = ctx.request.body.content;
  let photos = ctx.request.body.photos;
  try {
		await(new Promise((resolve, reject) => {
      db.query('update think set content = ? , photos = ? where id = ?', [content,photos,id] ,function (err, row) {
        if(err){
          reject(err)
        }else{
          resolve()
        }
      })
    }))
		ctx.success('0000','修改成功')
	}catch(err){
		ctx.error('0011','修改失败')
	}
})

module.exports = router;