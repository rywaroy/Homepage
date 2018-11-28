import * as Router from 'koa-router';
import * as request from 'request';
import IContext from '../interface/context';

const router: Router = new Router();

interface IOptions {
  url: string
  headers: object
}

const options: IOptions = {
	url: '',
	headers: {
		'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
	},
};
router.get('/list', async (ctx: IContext) => {
	const page: number = ctx.query.page || 1;
	const limit: number = ctx.query.limit || 10;
	const city: string = ctx.query.city || '杭州';
	const start: number = (page - 1) * limit;
	options.url = `https://api.douban.com/v2/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b&city=${city}&start=${start}&count=${limit}&client=&udid=`;
	const data = await (new Promise((resolve) => {
		request(options, function (error, response, body) {
			resolve(JSON.parse(body));
		});
	}));
	ctx.success(200, '获取成功', data);
});

router.get('/info', async (ctx: IContext) => {
	const id: number = ctx.query.id;
	const data = await (new Promise((resolve) => {
		options.url = `http://api.douban.com/v2/movie/subject/${id}?apikey=0b2bdeda43b5688921839c8ecb20399b&city=&client=&udid=`;
		request(options, function (error, response, body) {
			// console.log(response)
			resolve(JSON.parse(body));
		});
	}));
	ctx.success(200, '获取成功', data);
});

router.get('/image', async (ctx) => {
	const id: number = ctx.query.id;
	const page: number = ctx.query.page;
	const limit: number = ctx.query.limit;
	const start: number = (page - 1) * limit;
	const count: number = page * limit;
	const data = await (new Promise((resolve) => {
		options.url = `http://api.douban.com/v2/movie/subject/${id}/photos?apikey=0b2bdeda43b5688921839c8ecb20399b&start=${start}&count=${count}&client=&udid=`;
		request(options, function (error, response, body) {
			// console.log(response)
			resolve(JSON.parse(body));
		});
	}));
	ctx.success(200, '获取成功', data);
});

router.get('/comment', async (ctx) => {
	const id: number = ctx.query.id;
	const page: number = ctx.query.page;
	const limit: number = ctx.query.limit;
	const start: number = (page - 1) * limit;
	const data = await (new Promise((resolve) => {
		options.url = `http://api.douban.com/v2/movie/subject/${id}/comments?apikey=0b2bdeda43b5688921839c8ecb20399b&start=${start}&count=${limit}&client=&udid=`;
		request(options, function (error, response, body) {
			// console.log(response)
			resolve(JSON.parse(body));
		});
	}));
	ctx.success(200, '获取成功', data);
});


export default router;
