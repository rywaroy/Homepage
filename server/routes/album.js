const router = require('koa-router')();
const login = require('../middlewares/isLogin');
const Album = require('../model/album');
const AlbumGroup = require('../model/album_group');

router.post('/album', login.isLogin, async (ctx) => {
	const url = ctx.request.body.url;
	const title = ctx.request.body.title;
	const time = new Date();
	await Album.create({
		title,
		img: url,
		time,
	});
	ctx.success(200, '添加成功');
});

router.post('/album/delete', login.isLogin, async (ctx) => {
	const id = ctx.request.body.id;
	await Album.update({
		state: 0,
	}, {
		where: {
			id,
		},
	});
	ctx.success(200, '删除成功');
});

router.get('/album', async (ctx) => {
	const data = await Album.findAll({
		where: {
			state: 1,
		},
	});
	ctx.success(200, '获取成功', data);
});

router.post('/group', login.isLogin, async (ctx) => {
	const url = ctx.request.body.url;
	const id = ctx.request.body.id;
	await AlbumGroup.create({
		url,
		album_id: id,
	});
	ctx.success(200, '添加成功');
});

router.post('/group/delete', login.isLogin, async (ctx) => {
	const id = ctx.request.body.id;
	await AlbumGroup.destroy({
		where: {
			id,
		},
	});
	ctx.success(200, '删除成功');
});

router.get('/group', async (ctx) => {
	const id = ctx.query.id;
	const data = await AlbumGroup.findAll({
		where: {
			album_id: id,
		},
	});
	ctx.success(200, '获取成功', data);
});

module.exports = router;
