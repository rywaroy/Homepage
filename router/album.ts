import * as Router from 'koa-router';
import isLogin from '../middlewares/isLogin';
import Album from '../model/album';
import AlbumGroup from '../model/album_group';
import IContext from '../interface/context';
import { IAlbum, IGroup } from '../interface/album';

const router: Router = new Router();

router.post('/', isLogin, async (ctx: IContext) => {
	const url: string = ctx.request.body.url;
	const title: string = ctx.request.body.title;
	const time: object = new Date();
	await Album.create({
		title,
		img: url,
		time,
	});
	ctx.success(200, '添加成功');
});

router.delete('/:id', isLogin, async (ctx: IContext) => {
	const id = ctx.params.id;
	await Album.update({
		state: 0,
	}, {
		where: {
			id,
		},
	});
	ctx.success(200, '删除成功');
});

router.get('/', async (ctx: IContext) => {
	const data: IAlbum[] = await Album.findAll({
		where: {
			state: 1,
		},
	});
	ctx.success(200, '获取成功', data);
});

router.post('/:id/group', isLogin, async (ctx: IContext) => {
	const url: string = ctx.request.body.url;
	const id: number = ctx.params.id;
	await AlbumGroup.create({
		url,
		album_id: id,
	});
	ctx.success(200, '添加成功');
});

router.delete('/group/:id', isLogin, async (ctx: IContext) => {
	const id: number = ctx.params.id;
	await AlbumGroup.destroy({
		where: {
			id,
		},
	});
	ctx.success(200, '删除成功');
});

router.get('/:id/group', async (ctx: IContext) => {
	const id: number = ctx.params.id;
	const data: IGroup[] = await AlbumGroup.findAll({
		where: {
			album_id: id,
		},
	});
	ctx.success(200, '获取成功', data);
});

export default router;
