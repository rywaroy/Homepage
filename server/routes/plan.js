const router = require('koa-router')();
const db = require('../database');
const login = require('../middlewares/isLogin');
const Time = require('js-time.js');

// 获取计划列表
router.get('/list', async ctx => {
  const data = await (new Promise((resolve, reject) => {
    db.query('select id, title from plan where state = 1', (err, rows) => {
      if (err) {
				reject(err);
			} else {
				resolve(rows);
			}
    });
  }));
  ctx.success('0000', '获取成功', {
		list: data,
	});
});

// 新增计划
router.post('/list', login.isLogin, async ctx => {
  const title = ctx.request.body.title;
  try {
    await (new Promise((resolve, reject) => {
      db.query('insert into plan (title, start) values(?,?)', [title, Time().format('YYYY-MM-DD')], (err, rows) => {
        if (rows.insertId) {
					resolve();
				} else {
					reject(err);
				}
      });
    }));
    ctx.success('0000', '添加成功');
  } catch (err) {
    ctx.error('0011', '添加失败');
  }
});

// 删除计划
router.post('/list/delete', login.isLogin, async ctx => {
  const id = ctx.request.body.id;
  try {
    await (new Promise((resolve, reject) => {
      db.query('update plan set state = 0 where id = ?', [id], err => {
        if (err) {
					reject(err);
				} else {
					resolve();
				}
      });
    }));
    ctx.success('0000', '删除成功');
  } catch (err) {
    ctx.error('0011', '删除失败');
  }
});

// 打卡
router.post('/clock', login.isLogin, async ctx => {
  const time = ctx.request.body.time;
  const id = ctx.request.body.id;
  try {
    await (new Promise((resolve, reject) => {
      db.query('insert into plan_record (tid, time) values(?,?)', [id, time], (err, rows) => {
        if (rows.insertId) {
					resolve();
				} else {
					reject(err);
				}
      });
    }));
    ctx.success('0000', '打卡成功');
  } catch (err) {
    ctx.error('0011', '打卡失败');
  }
});

// 查询某日打卡信息
router.get('/date', async ctx => {
  const time = ctx.query.time;
  const start = ctx.query.start;
  const end = ctx.query.end;
  const id = ctx.query.id;
  const query = `select a.time, a.tid, b.title from plan_record as a left join plan as b on a.tid = b.id where ${time ? `time = '${time}'` : `time >= '${start}'`} ${end ? `and time <= '${end}'` : ''} ${id ? `and tid = ${id}` : ''}`;
  const data = await (new Promise((resolve, reject) => {
    db.query(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  }));
  ctx.success('0000', '获取成功', {
		list: data,
	});
});

// 查询某计划打卡记录
router.get('/plan', async ctx => {
  const id = ctx.query.id;
  const data = await (new Promise((resolve, reject) => {
    db.query(`select * from plan_record ${id ? `where tid = '${id}'` : ''}`, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  }));
  ctx.success('0000', '获取成功', {
		list: data,
	});
});

// 打卡分析
router.get('/analysis', async ctx => {
  const obj = {};
  const plan = await (new Promise((resolve, reject) => {
    db.query('select id, title, start from plan where state = 1', (err, rows) => {
      if (err) {
				reject(err);
			} else {
				resolve(rows);
			}
    });
  }));
  for (let i = 0; i < plan.length; i++) {
    const id = plan[i].id;
    obj[id] = {};
    obj[id].id = id;
    obj[id].title = plan[i].title;
    obj[id].total = Time().dayNum(plan[i].start);
    obj[id].successTotal = 0;
    obj[id].start = plan[i].start;
    obj[id].data = {};
    const date = `${new Date(plan[i].start).getFullYear()}年${new Date(plan[i].start).getMonth() + 1}月`;
    obj[id].data[date] = {};
    obj[id].data[date].date = date;
    obj[id].data[date].fail = Time(plan[i].start).monthDays() - Time(plan[i].start).date() + 1;
    obj[id].data[date].success = 0;
  }
  const list = await (new Promise((resolve, reject) => {
    db.query('select * from plan_record', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  }));
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const tid = item.tid;
    const year = new Date(item.time).getFullYear();
    const month = new Date(item.time).getMonth() + 1;
    const data = obj[tid];
    data.successTotal++;
    const name = `${year}年${month}月`;
    if (data.data[name]) {
      data.data[name].success++;
      data.data[name].fail--;
    } else {
      data.data[name] = {};
      data.data[name].date = `${year}年${month}月`;
      data.data[name].fail = Time(item.start).monthDays() - 1;
      data.data[name].success = 1;
    }
  }
  const data = [];
  for (const i in obj) {
    const dateArray = [];
    const failArray = [];
    const successArray = [];
    for (const j in obj[i].data) {
      const dataItem = obj[i].data[j];
      dateArray.push(dataItem.date);
      failArray.push(dataItem.fail);
      successArray.push(dataItem.success);
    }
    obj[i].failTotal = obj[i].total - obj[i].successTotal;
    obj[i].date = dateArray;
    obj[i].fail = failArray;
    obj[i].success = successArray;
    delete obj[i].data;
    data.push(obj[i]);
  }

  ctx.success('0000', '获取成功', data);
});

module.exports = router;
