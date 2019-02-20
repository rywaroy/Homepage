
import { Context } from 'koa';
import * as fs from 'fs';
import * as Router from 'koa-router';
import article from './article';
import admin from './admin';
import album from './album';
import base from './base';
import douban from './douban';
import learn from './learn';
import one from './one';
import plan from './plan';
import think from './think';
import time from './time';


const router: Router = new Router();

router.use('/api/article', article.routes(), article.allowedMethods());
router.use('/api/admin', admin.routes(), admin.allowedMethods());
router.use('/api/album', album.routes(), album.allowedMethods());
router.use('/api/base', base.routes(), base.allowedMethods());
router.use('/api/douban', douban.routes(), douban.allowedMethods());
router.use('/api/learn', learn.routes(), learn.allowedMethods());
router.use('/api/one', one.routes(), one.allowedMethods());
router.use('/api/plan', plan.routes(), plan.allowedMethods());
router.use('/api/think', think.routes(), think.allowedMethods());
router.use('/api/time', time.routes(), time.allowedMethods());

router.get('/admin', async (ctx: Context) => {
	const htmlFile = await (new Promise(function (resolve, reject) {
		fs.readFile('/home/homepage2/server/admin/index.html', (err: any, data: any) => {
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
			fs.readFile('/home/homepage2/server/pc/index.html', (err: any, data: any) => {
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

router.get('*', async (ctx: Context, next: () => Promise<any>) => {
	if (ctx.response.status === 404 && ctx.request.path.indexOf('api') === -1) {
		const htmlFile = await (new Promise(function (resolve, reject) {
			fs.readFile('/home/homepage2/server/pc/index.html', (err: any, data: any) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		}));
		ctx.type = 'html';
		ctx.body = htmlFile;
	} else {
		next();
	}
});

export default router;

