const router = require('koa-router')();
const request = require('request');

// 列表

router.get('/list', async ctx => {
  const date = ctx.query.date;
  const data = await (new Promise((resolve) => {
		request(`http://v3.wufazhuce.com:8000/api/channel/one/${date}/%E6%9D%AD%E5%B7%9E%E5%B8%82`, function (error, response, body) {
			resolve(JSON.parse(body));
		});
  }));
	ctx.success('0000', '获取成功', data.data);
});

// 连载详情
router.get('/info', async ctx => {
  const id = ctx.query.id;
  const type = ctx.query.type;
  const data = await (new Promise((resolve) => {
		request(`http://v3.wufazhuce.com:8000/api/${type}/htmlcontent/${id}`, function (error, response, body) {
			resolve(JSON.parse(body));
		});
  }));
	ctx.success('0000', '获取成功', data.data);
});

// 评论
router.get('/comment', async ctx => {
  const id = ctx.query.id;
  const type = ctx.query.type;
  const data = await (new Promise((resolve) => {
		request(`http://v3.wufazhuce.com:8000/api/comment/praiseandtime/${type}/${id}/0`, function (error, response, body) {
			resolve(JSON.parse(body));
		});
	}));
	ctx.success('0000', '获取成功', data.data);
});

module.exports = router;
