// import * as Koa from 'koa';
import router from './router';
const Koa = require('koa');
const cors = require('koa-cors');
const convert = require('koa-convert');
const bodyparser = require('koa-bodyparser');
const staticServer = require('koa-static');
const json = require('koa-json');

const app = new Koa();

app.use(cors());
app.use(bodyparser({
  formLimit: '5mb',
}));
app.use(staticServer(`${__dirname}/static`));
app.use(convert(json()));
app.use(require('./middlewares/returnData'));
app.use(router.routes(), router.allowedMethods());

app.listen(3001);
