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

router.get('/sell', async (ctx: IContext) => {
	const data = await (new Promise((resolve) => {
		options.url = 'https://api-m.mtime.cn/PageSubArea/HotPlayMovies.api?locationId=974'
		request(options, function (error, response, body) {
			resolve(JSON.parse(body));
		});
	}));
	ctx.success(200, '获取成功', data);
});

router.get('/hot', async (ctx: IContext) => {
	const data = await (new Promise((resolve) => {
		options.url = 'https://api-m.mtime.cn/Showtime/LocationMovies.api?locationId=974'
		request(options, function (error, response, body) {
			resolve(JSON.parse(body));
		});
	}));
	ctx.success(200, '获取成功', data);
});

router.get('/soon', async (ctx: IContext) => {
	options.url = 'https://api-m.mtime.cn/Movie/MovieComingNew.api?locationId=974'
	const data = await (new Promise((resolve) => {
		request(options, function (error, response, body) {
			resolve(JSON.parse(body));
		});
	}));
	ctx.success(200, '获取成功', data);
});

router.get('/info', async (ctx: IContext) => {
	const id = ctx.query.id;
	const info = new Promise((resolve) => {
		options.url = `https://ticket-api-m.mtime.cn/movie/detail.api?locationId=974&movieId=${id}`;
		request(options, function (error, response, body) {
			resolve(JSON.parse(body).data);
		});
	});
	const performer = new Promise((resolve) => {
		options.url = `https://api-m.mtime.cn/Movie/MovieCreditsWithTypes.api?movieId=${id}`;
		request(options, function (error, response, body) {
			resolve(JSON.parse(body).types);
		});
	});
	const comment = new Promise((resolve) => {
		options.url = `https://ticket-api-m.mtime.cn/movie/hotComment.api?movieId=${id}`;
		request(options, function (error, response, body) {
			resolve(JSON.parse(body).data);
		});
	});
	const tidbits = new Promise((resolve) => {
		options.url = `https://api-m.mtime.cn/Movie/Video.api?pageIndex=1&movieId=${id}`;
		request(options, function (error, response, body) {
			resolve(JSON.parse(body).videoList);
		});
	});
	const photo = new Promise((resolve) => {
		options.url = `https://api-m.mtime.cn/Movie/ImageAll.api?movieId=${id}`;
		request(options, function (error, response, body) {
			resolve(JSON.parse(body).images);
		});
	});
	const data = await (Promise.all([info, performer, comment, tidbits, photo]));

	ctx.success(200, '获取成功', {
		info: data[0],
		performer: data[1],
		comment: data[2],
		tidbits: data[3],
		photo: data[4],
	});
});

export default router;
