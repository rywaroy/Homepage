
import article from './artilce';
import { Context } from 'koa';
import * as fs from 'fs';
import * as Router from 'koa-router';

const router: Router = new Router();

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

router.get('/', async (ctx: Context, next: () => Promise<any>) => {
	if (ctx.request.path.indexOf('api') > -1) {
		next();
	} else {
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

export default router;

