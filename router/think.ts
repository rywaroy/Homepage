import * as Router from 'koa-router';
import isLogin from '../middlewares/isLogin';
import Think from '../model/think';
import Admin from '../model/admin';
import IContext from '../interface/context';
import { IThinkList, IThink } from '../interface/think';
import { IAdmin } from '../interface/admin';

const router: Router = new Router();

// 获取说说列表
router.get('/', async (ctx: IContext) => {
  const page: number = Number(ctx.query.page) || 1;
  const limit: number = Number(ctx.query.limit) || 10;
  const data: IThinkList = await Think.findAndCount({
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
router.get('/:id', async ctx => {
  const id: number = ctx.params.id;

  const data: IThink = await Think.findById(id);

  if (data.photos) {
    data.photos = data.photos.split(',');
  } else {
    data.photos = [];
  }

  ctx.success(200, '获取成功', data);
});


// 添加说说
router.post('/', isLogin, async ctx => {
  const {
    content,
    photos,
  }: {
    content: string,
    photos: string,
  } = ctx.request.body;

  const user: IAdmin = await Admin.findById(1);

  await Think.create({
    avatar: user.avatar,
    name: user.name,
    content,
    photos,
  });

  ctx.success(200, '添加成功');
});

// 删除说说
router.delete('/:id', isLogin, async ctx => {
  const id: number = ctx.params.id;
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
router.post('/:id', isLogin, async ctx => {
  const id: number = ctx.params.id;
  const {
    content,
    photos,
  }: {
    content: string,
    photos: string,
  } = ctx.request.body;
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

export default router;
