const router = require('koa-router')();
const login = require('../middlewares/isLogin');
const Think = require('../model/think');
const Admin = require('../model/admin');

// 获取说说列表
router.get('/list', async ctx => {
  const page = ctx.query.page || 1;
  const limit = ctx.query.limit || 10;
  const data = await Think.findAndCount({
    where: {
      state: 1,
    },
    order: [['time', 'DESC']],
    limit,
		offset: (page - 1) * limit,
  });

  for (const item of data.rows) {
    if (item.photos) {
      item.photos = item.photos.split(',');
    } else {
      item.photos = [];
    }
  }

  ctx.success(200, '获取成功', {
    list: data.rows,
    count: data.count,
  });
});

// 获取说说详情
router.get('/info', async ctx => {
  const id = ctx.query.id;

  const data = await Think.findById(id);

  if (data.photos) {
    data.photos = data.photos.split(',');
  } else {
    data.photos = [];
  }

  ctx.success(200, '获取成功', data);
});


// 添加说说
router.post('/info', login.isLogin, async ctx => {
  const content = ctx.request.body.content;
  const photos = ctx.request.body.photos;
  const time = new Date();

  const user = await Admin.findById(1);

  await Think.create({
    avatar: user.avatar,
    name: user.name,
    time,
    content,
    photos,
  });

  ctx.success(200, '添加成功');
});

// 删除说说
router.post('/delete', login.isLogin, async ctx => {
  const id = ctx.request.body.id;
  await Think.update({
    state: 0,
  }, {
    where: {
      id,
    },
  });
  ctx.success(200, '删除成功');
});

// 修改说说
router.post('/edit', login.isLogin, async ctx => {
  const id = ctx.request.body.id;
  const content = ctx.request.body.content;
  const photos = ctx.request.body.photos;
  await Think.update({
    content,
    photos,
  }, {
    where: {
      id,
    },
  });
  ctx.success(200, '修改成功');
});

module.exports = router;
