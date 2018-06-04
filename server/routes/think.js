const router = require('koa-router')();
const db = require('../database');
const login = require('../middlewares/isLogin');

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
      item.photos = JSON.parse(item.photos)
    } else {
      item.photos = [];
    }
  }

  ctx.success('0000', '获取成功', {
    list: data,
    count: count[0].count,
  })
})

module.exports = router;