
import * as Router from 'koa-router';
import * as xss from 'xss';
import isLogin from '../middlewares/isLogin';
import Article from '../model/article';
import Tag from'../model/tag';
import Comment from '../model/comment';
import IContext from '../interface/context';
import { IArticle, IArticleList, TTag, IComment } from '../interface/article';

const router: Router = new Router();

// 获取文章标签
router.get('/tag', async (ctx: IContext) => {
	const list: TTag[] = await Tag.findAll({
		where: {
			state: 1,
		},
	});
	ctx.success(200, '获取成功', list);
});

// 添加文章标签
router.post('/tag', async (ctx: IContext) => {
	const title: string = ctx.request.body.title;
	const color: string = ctx.request.body.color;

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
router.delete('/tag', isLogin, async (ctx: IContext) => {
	const id: number = ctx.request.body.id;
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

Article.belongsTo(Tag, {
	foreignKey: 'tagid',
});

// 获取文章列表
router.get('/', async (ctx: IContext) => {
	const page: number = Number(ctx.query.page) || 1;
	const limit: number = Number(ctx.query.limit) || 10;
	const data: IArticleList = await Article.findAndCount({
		attributes: ['id', 'title', 'updatedAt', 'intro', 'top', 'watch', 'likes', 'img'],
		limit,
		offset: (page - 1) * limit,
		where: {
			state: 1,
		},
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
router.get('/:id', async (ctx: IContext) => {
	const id = ctx.params.id;
	if (!id) {
		ctx.error(400, '请输入文章id');
		return;
	}
	const data: IArticle = await Article.findById(id);
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
router.delete('/:id', isLogin, async (ctx: IContext) => {
	const id: number = ctx.params.id;
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
router.post('/', isLogin, async (ctx: IContext) => {
	const title: string = ctx.request.body.title;
	const intro: string = ctx.request.body.intro;
	const content: string = ctx.request.body.content;
	const tagid: number = ctx.request.body.tagId;
	await Article.create({
		title,
		intro,
		content,
		tagid,
	});
	ctx.success(200, '添加成功');
});

// 设置文章置顶
router.post('/top', isLogin, async (ctx: IContext) => {
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
router.patch('/:id', isLogin, async (ctx: IContext) => {
	const id: number = ctx.params.id;
	const title: string = ctx.request.body.title;
	const intro: string = ctx.request.body.intro;
	const content: string = ctx.request.body.content;
	const tagid: number = ctx.request.body.tagId;
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
router.post('/:id/comment', async (ctx: IContext) => {
	const id: number = ctx.params.id;
	const name: string = xss(ctx.request.body.name) || '匿名';
	const content: string = xss(ctx.request.body.content);
	const ip: string = ctx.request.header['x-forward-for'].substring(0, 10) + '**';
	if (DataLength(name) > 12 || DataLength(content) > 1000) {
		ctx.error(400, '字数超过限制');
		return;
	}
	await Comment.create({
		name: `${name} ${ip}`,
		content,
		aid: id,
	});
	ctx.success(200, '添加成功');
});

function DataLength(fData: string) {
	let intLength: number = 0;
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
router.get('/:id/comment', async (ctx: IContext) => {
	const id: number = ctx.params.id;
	const data: IComment[] = await Comment.findAll({
		where: {
			aid: id,
		},
	});
	ctx.success(200, '获取成功', data);
});

// 点赞
router.post('/:id/like', async (ctx: IContext) => {
	const id: number = ctx.params.id;

	const data: IArticle = await Article.findById(id);
	if (data) {
		await Article.update({
			likes: ++data.likes,
		}, {
			where: {
				id,
			},
		});
	}
	ctx.success(200, '点赞成功成功');
});

export default router;