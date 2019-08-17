import * as Router from 'koa-router';
import * as request from 'request';
import IContext from '../interface/context';

const router: Router = new Router();

// 列表
router.get('/list', async (ctx: IContext) => {
  const date: string = ctx.query.date;
  const data: any = await (new Promise((resolve) => {
		request(`http://v3.wufazhuce.com:8000/api/channel/one/${date}/%E6%9D%AD%E5%B7%9E%E5%B8%82`, function (error, response, body) {
			resolve(JSON.parse(body));
		});
  }));
	ctx.success(200, '获取成功', data.data);
});

// 连载详情
router.get('/info', async (ctx: IContext) => {
	const {
		id,
		type,
	}: {
		id: number,
		type: number,
	} = ctx.query;
  const data: any = await (new Promise((resolve) => {
		request(`http://v3.wufazhuce.com:8000/api/${type}/htmlcontent/${id}`, function (error, response, body) {
			resolve(JSON.parse(body));
		});
  }));
	ctx.success(200, '获取成功', data.data);
});

// 评论
router.get('/comment', async (ctx: IContext) => {
  const {
		id,
		type,
	}: {
		id: number,
		type: number,
	} = ctx.query;
  const data: any = await (new Promise((resolve) => {
		request(`http://v3.wufazhuce.com:8000/api/comment/praiseandtime/${type}/${id}/0`, function (error, response, body) {
			resolve(JSON.parse(body));
		});
	}));
	ctx.success(200, '获取成功', data.data);
});

export default router;
