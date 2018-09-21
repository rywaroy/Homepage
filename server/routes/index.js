const fs = require('fs');
const router = require('koa-router')();
const article = require('./article');
const learn = require('./learn');
const admin = require('./admin');
const album = require('./album');
// const file = require('./file');
const time = require('./time');
const douban = require('./douban');
const dytt = require('./dytt');
const weather = require('./weather');
const base = require('./base');
const think = require('./think');
const plan = require('./plan');
const one = require('./one');

router.use('/api/article', article.routes());
router.use('/api/learn', learn.routes());
router.use('/api/admin', admin.routes());
router.use('/api/album', album.routes());
// router.use('/api/file', file.routes());
router.use('/api/time', time.routes()); // time时光网接口
router.use('/api/douban', douban.routes());
router.use('/api/dytt', dytt.routes());
router.use('/api/weather', weather.routes());
router.use('/api/base', base.routes());
router.use('/api/think', think.routes());
router.use('/api/plan', plan.routes());
router.use('/api/one', one.routes());

router.get('/admin', async (ctx) => {
	const htmlFile = await (new Promise(function (resolve, reject) {
		fs.readFile('/home/homepage/server/admin/index.html', (err, data) => {
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

router.get('/', async (ctx) => {
	const htmlFile = await (new Promise(function (resolve, reject) {
		fs.readFile('/home/homepage/server/pc/index.html', (err, data) => {
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

router.get('*', async (ctx) => {
	if (ctx.response.status === 404 && ctx.request.path.indexOf('api') === -1) {
		const htmlFile = await (new Promise(function (resolve, reject) {
			fs.readFile('/home/homepage/server/pc/index.html', (err, data) => {
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
