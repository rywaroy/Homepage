
import * as Router from 'koa-router';
import isLogin from '../middlewares/isLogin';
import * as dayjs from 'dayjs';
import Plan from '../model/plan';
import PlanRecord from '../model/plan_record';
import * as Sequelize from 'sequelize';
import { IPlanList, IPlanRecordList } from '../interface/plan';
import IContext from '../interface/context';

const router: Router = new Router();
const Op = Sequelize.Op;

PlanRecord.belongsTo(Plan, {
	foreignKey: 'tid',
});

// 获取计划列表
router.get('/', async (ctx: IContext) => {
  const data: IPlanList[] = await Plan.findAll({
    attributes: ['id', 'title'],
    where: {
      state: 1,
    },
  });
  ctx.success(200, '获取成功', {
		list: data,
	});
});

// 新增计划
router.post('/', isLogin, async (ctx: IContext) => {
  const title: string = ctx.request.body.title;
  await Plan.create({
    title,
    start: dayjs().format('YYYY-MM-DD'),
  });
  ctx.success(200, '添加成功');
});

// 删除计划
router.post('/:id', isLogin, async (ctx: IContext) => {
  const id: number = ctx.params.id;
  await Plan.update({
    state: 0,
  }, {
    where: {
      id,
    },
  });
  ctx.success(200, '删除成功');
});

// 打卡
router.post('/clock', isLogin, async (ctx: IContext) => {
  const time: string = ctx.request.body.time;
  const id: number = ctx.request.body.id;
  await PlanRecord.create({
    tid: id,
    time,
  });
  ctx.success(200, '打卡成功');
});


// 查询某日打卡信息
router.get('/date', async (ctx: IContext) => {
  const time: string = ctx.query.time;
  const start: string = ctx.query.start;
  const end: string = ctx.query.end;
  const id: number = ctx.query.id;
  const where: any = {};
  if (time) where.time = time;
  if (start) where.time = { [Op.gte]: start };
  if (end) where.time = { [Op.lte]: end };
  if (id) where.tid = id;

  const data: IPlanRecordList[] = await PlanRecord.findAll({
    attributes: ['time', 'tid'],
    where,
    include: [{
			model: Plan,
			attributes: ['title'],
		}],
  });
  ctx.success(200, '获取成功', {
		list: data,
	});
});

// 查询某计划打卡记录
router.get('/plan', async (ctx: IContext) => {
  const id: number = ctx.query.id;
  const where: any = {};
  if (id) where.tid = id;
  const data: IPlanRecordList[] = await PlanRecord.findAll({
    where,
  });
  ctx.success(200, '获取成功', {
		list: data,
	});
});

// 打卡分析
router.get('/analysis', async (ctx: IContext) => {
  const obj: any = {};
  const plan: IPlanList[] = await Plan.findAll({
    attributes: ['id', 'title', 'start'],
    where: {
      state: 1,
    },
  });
  for (let i = 0; i < plan.length; i++) {
    const id = plan[i].id;
    obj[id] = {};
    obj[id].id = id;
    obj[id].title = plan[i].title;
    const num = (Number(dayjs().valueOf()) - Number(dayjs(plan[i].start).valueOf())) / 86400000;
    obj[id].total = parseInt(String(num), 10);
    // obj[id].total = Time().dayNum(plan[i].start);
    obj[id].successTotal = 0;
    obj[id].start = plan[i].start;
    obj[id].data = {};
    const date = `${new Date(plan[i].start).getFullYear()}年${new Date(plan[i].start).getMonth() + 1}月`;
    obj[id].data[date] = {};
    obj[id].data[date].date = date;
    obj[id].data[date].fail = dayjs(plan[i].start).daysInMonth() - dayjs(plan[i].start).date() + 1;
    obj[id].data[date].success = 0;
  }
  const list = await PlanRecord.findAll();
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const tid = item.tid;
    const year = new Date(item.time).getFullYear();
    const month = new Date(item.time).getMonth() + 1;
    const data = obj[tid];
    if (data === undefined) {
      continue;
    }
    data.successTotal++;
    const name = `${year}年${month}月`;
    if (data.data[name]) {
      data.data[name].success++;
      data.data[name].fail--;
    } else {
      data.data[name] = {};
      data.data[name].date = `${year}年${month}月`;
      data.data[name].fail = dayjs(item.start).daysInMonth() - 1;
      data.data[name].success = 1;
    }
  }
  const data = [];
  for (const i in obj) {
    const dateArray = [];
    const failArray = [];
    const successArray = [];
    for (const j in obj[i].data) {
      const dataItem = obj[i].data[j];
      dateArray.push(dataItem.date);
      failArray.push(dataItem.fail);
      successArray.push(dataItem.success);
    }
    obj[i].failTotal = obj[i].total - obj[i].successTotal;
    obj[i].date = dateArray;
    obj[i].fail = failArray;
    obj[i].success = successArray;
    delete obj[i].data;
    data.push(obj[i]);
  }

  ctx.success(200, '获取成功', data);
});

export default router;
