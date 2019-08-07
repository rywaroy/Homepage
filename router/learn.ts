import * as Router from 'koa-router';
import isLogin from '../middlewares/isLogin';
import Learn from '../model/learn';
import { ICount, IInfo } from '../interface/learn';
import IContext from '../interface/context';
import Tag from'../model/tag';

const router: Router = new Router();

Learn.belongsTo(Tag, {
	foreignKey: 'tagid',
});

// 获取文章列表
router.get('/', async (ctx: IContext) => {
	const page: number = Number(ctx.query.page) || 1;
	const limit: number = Number(ctx.query.limit) || 10;
	const data: ICount = await Learn.findAndCount({
		attributes: ['id', 'title', 'updatedAt', 'intro', 'sign'],
		where: {
			state: 1,
		},
		limit,
		offset: (page - 1) * limit,
		order: [['id', 'DESC']],
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
	const id: number = ctx.params.id;
	if (!id) {
		ctx.error(400, '请输入文章id');
		return;
	}
	const data: IInfo = await Learn.findById(id);
	ctx.success(200, '获取成功', data);
});

// 删除文章
router.delete('/:id', isLogin, async (ctx: IContext) => {
	const id: number = ctx.params.id;
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
router.post('/', isLogin, async (ctx) => {
	const title: string = ctx.request.body.title;
	const intro: string = ctx.request.body.intro;
	const html: string = ctx.request.body.html;
	const md: string = ctx.request.body.md;
	const tagid: number = ctx.request.body.tagid;
	const sign: string = ctx.request.body.sign;
	const type: number = ctx.request.body.type;
	await Learn.create({
		title,
		intro,
		html,
		md,
		tagid,
		type,
		sign,
	});
	ctx.success(200, '添加成功');
});

// 更新文章
router.patch('/:id', isLogin, async (ctx) => {
	const id: number = ctx.params.id;
	const title: string = ctx.request.body.title;
	const intro: string = ctx.request.body.intro;
	const html: string = ctx.request.body.html;
	const md: string = ctx.request.body.md;
	const tag: string = ctx.request.body.tag;
	const update: object = new Date();
	const type: number = ctx.request.body.type;
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

export default router;
