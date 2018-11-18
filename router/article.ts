
import * as Router from 'koa-router';
// import * as xss from 'xss';
import isLogin from '../middlewares/isLogin';
import Article from '../model/article';
import Tag from'../model/tag';
// import Comment from '../model/comment';
import IContext from '../interface/context';

const router: Router = new Router();

Article.belongsTo(Tag, {
	foreignKey: 'tagid',
});

// 获取文章列表
router.get('/list', async (ctx: IContext) => {
	const page: number = Number(ctx.query.page) || 1;
	const limit: number = Number(ctx.query.limit) || 10;
	const data = await Article.findAndCount({
		attributes: ['id', 'title', 'time', 'content', 'intro', 'top', 'watch'],
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
router.get('/info', async (ctx: IContext) => {
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
router.post('/delete', isLogin, async (ctx: IContext) => {
	const id: number = ctx.request.body.id;
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

export default router;