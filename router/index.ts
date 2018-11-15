const fs = require('fs');
const router = require('koa-router')();
const article = require('./article');
import { Context } from 'koa';


router.use('/api/article', article.routes());

router.get('/admin', async (ctx: Context) => {
	const htmlFile = await (new Promise(function (resolve, reject) {
		fs.readFile('/home/homepage/server/admin/index.html', (err: any, data: any) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	}));
	ctx.type = 'html';
	ctx.body = htmlFile;
});

router.get('/', async (ctx: Context) => {
	const htmlFile = await (new Promise(function (resolve, reject) {
		fs.readFile('/home/homepage/server/pc/index.html', (err: any, data: any) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	}));
	ctx.type = 'html';
	ctx.body = htmlFile;
});

router.get('*', async (ctx: Context) => {
	if (ctx.response.status === 404 && ctx.request.path.indexOf('api') === -1) {
		const htmlFile = await (new Promise(function (resolve, reject) {
			fs.readFile('/home/homepage/server/pc/index.html', (err: any, data: any) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		}));
		ctx.type = 'html';
		ctx.body = htmlFile;
	}
});

module.exports = router;

