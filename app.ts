import * as Koa from 'koa';
import router from './router';
import * as cors from 'koa-cors';
import * as bodyparser from 'koa-bodyparser';
import * as staticServer from 'koa-static';
import * as json from 'koa-json';
const convert = require('koa-convert');

const app = new Koa();

app.use(cors());
app.use(bodyparser({
  formLimit: '5mb',
}));
app.use(staticServer(`${__dirname}/static`));
app.use(convert(json()));
app.use(require('./middlewares/returnData'));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3001);
