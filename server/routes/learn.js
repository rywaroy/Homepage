const router = require('koa-router')();
const login = require('../middlewares/isLogin');
const Learn = require('../model/learn');

// 获取文章列表
router.get('/list', async (ctx) => {
	const page = Number(ctx.query.page) || 1;
	const limit = Number(ctx.query.limit) || 10;
	const data = await Learn.findAndCount({
		attributes: ['id', 'title', 'time', 'intro', 'tag'],
		where: {
			state: 1,
		},
		limit,
		offset: (page - 1) * limit,
		order: [['id', 'DESC']],
	});
	ctx.success(200, '获取成功', {
		list: data.rows,
		total: data.count,
	});
});

// 获取文章详情
router.get('/info', async (ctx) => {
	const id = ctx.query.id;
	if (!id) {
		ctx.error(400, '请输入文章id');
		return;
	}
	const data = await Learn.findById(id);
	ctx.success(200, '获取成功', data);
});

// 删除文章
router.post('/delete', login.isLogin, async (ctx) => {
	const id = ctx.request.body.id;
	if (!id) {
		ctx.error(400, '请输入文章id');
		return;
	}
	await Learn.update({
		state: 0,
	}, {
		where: {
			id,
		},
	});
	ctx.success(200, '删除成功');
});

// 添加文章
router.post('/add', login.isLogin, async (ctx) => {
	const title = ctx.request.body.title;
	const intro = ctx.request.body.intro;
	const html = ctx.request.body.html;
	const md = ctx.request.body.md;
	const time = new Date();
	const tag = ctx.request.body.tag;
	const type = ctx.request.body.type;
	await Learn.create({
		title,
		intro,
		html,
		time,
		md,
		tag,
		type,
	});
	ctx.success(200, '添加成功');
});

// 更新文章
router.post('/update', login.isLogin, async (ctx) => {
	const id = ctx.request.body.id;
	const title = ctx.request.body.title;
	const intro = ctx.request.body.intro;
	const html = ctx.request.body.html;
	const md = ctx.request.body.md;
	const tag = ctx.request.body.tag;
	const update = new Date();
	const type = ctx.request.body.type;
	await Learn.update({
		title,
		intro,
		html,
		md,
		tag,
		update,
		type,
	}, {
		where: {
			id,
		},
	});
	ctx.success(200, '更新成功');
});

module.exports = router;
