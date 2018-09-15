const router = require('koa-router')();
const xss = require('xss');
const login = require('../middlewares/isLogin');
const Article = require('../model/article');
const Tag = require('../model/tag');
const Comment = require('../model/comment');

Article.belongsTo(Tag, {
	foreignKey: 'tagid',
});

// 获取文章列表
router.get('/list', async (ctx) => {
	const page = Number(ctx.query.page) || 1;
	const limit = Number(ctx.query.limit) || 10;
	const data = await Article.findAndCount({
		attributes: ['id', 'title', 'time', 'content', 'intro', 'top', 'watch'],
		limit,
		offset: (page - 1) * limit,
		order: [['top', 'DESC']],
		include: [{
			model: Tag,
			as: 'tag',
			attributes: ['title', 'color'],
		}],
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
	const data = await Article.findById(id);
	if (data) {
		await Article.update({
			watch: ++data.watch,
		}, {
			where: {
				id,
			},
		});
	}
	ctx.success(200, '获取成功', data);
});

// 删除文章
router.post('/delete', login.isLogin, async (ctx) => {
	const id = ctx.request.body.id;
	if (!id) {
		ctx.error(400, '请输入文章id');
		return;
	}
	await Article.update({
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
	const content = ctx.request.body.content;
	const time = new Date();
	const tagid = ctx.request.body.tagId;
	await Article.create({
		title,
		intro,
		content,
		time,
		tagid,
	});
	ctx.success(200, '添加成功');
});

// 获取文章标签
router.get('/tag', async (ctx) => {
	const list = await Tag.findAll({
		where: {
			state: 1,
		},
	});
	ctx.success(200, '获取成功', list);
});

// 添加文章标签
router.post('/tag', async (ctx) => {
	const title = ctx.request.body.title;
	const color = ctx.request.body.color;

	if (!title || !color) {
		ctx.error(400, '请输入标题或颜色');
		return;
	}

	await Tag.create({
		title,
		color,
	});
	ctx.success(200, '添加成功');
});

// 删除文章标签
router.post('/tag/delete', login.isLogin, async (ctx) => {
	const id = ctx.request.body.id;
	if (!id) {
		ctx.error(400, '请输入标签id');
		return;
	}
	await Tag.update({
		state: 0,
	}, {
		where: {
			id,
		},
	});
	ctx.success(200, '删除成功');
});

// 设置文章置顶
router.post('/top', login.isLogin, async (ctx) => {
	const id = ctx.request.body.id;
	const top = ctx.request.body.top;
	if (!id) {
		ctx.error(400, '请输入标签id');
		return;
	}
	await Article.update({
		top,
	}, {
		where: {
			id,
		},
	});
	ctx.success(200, '设置成功');
});

// 更新文章
router.post('/update', login.isLogin, async (ctx) => {
	const id = ctx.request.body.id;
	const title = ctx.request.body.title;
	const intro = ctx.request.body.intro;
	const content = ctx.request.body.content;
	const tagid = ctx.request.body.tagId;
	await Article.update({
		title,
		intro,
		content,
		tagid,
	}, {
		where: {
			id,
		},
	});
	ctx.success(200, '更新成功');
});

// 添加文章评论
router.post('/comment', async (ctx) => {
	const id = ctx.request.body.id;
	const name = xss(ctx.request.body.name) || '匿名';
	const content = xss(ctx.request.body.content);
	const time = new Date();
	const ip = ctx.request.header['x-forward-for'].substring(0, 6) + '**';
	if (DataLength(name) > 12 || DataLength(content) > 1000) {
		ctx.error(400, '字数超过限制');
		return;
	}
	await Comment.create({
		name: `${name} ${ip}`,
		content,
		time,
		aid: id,
	});
	ctx.success(200, '添加成功');
});

function DataLength(fData) {
	let intLength = 0;
	for (let i = 0; i < fData.length; i++) {
		if ((fData.charCodeAt(i) < 0) || (fData.charCodeAt(i) > 255)) {
			intLength += 2;
		} else {
			intLength += 1;
		}
	}
	return intLength;
}

// 获取文章评论
router.get('/comment', async (ctx) => {
	const id = ctx.query.id;
	const data = await Comment.findAll({
		where: {
			aid: id,
		},
	});
	ctx.success(200, '获取成功', data);
});

module.exports = router;
