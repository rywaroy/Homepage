import * as Router from 'koa-router';
import isLogin from '../middlewares/isLogin';
import Album from '../model/album';
import AlbumGroup from '../model/album_group';
import IContext from '../interface/context';
import { IAlbum } from '../interface/album';

const router: Router = new Router();

router.post('/album', isLogin, async (ctx: IContext) => {
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

router.delete('/album/:id', isLogin, async (ctx: IContext) => {
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

router.get('/album', async (ctx: IContext) => {
	const data: IAlbum[] = await Album.findAll({
		where: {
			state: 1,
		},
	});
	ctx.success(200, '获取成功', data);
});

export default router;
