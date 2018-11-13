// import * as Koa from 'koa';
const Koa = require('koa');
const cors = require('koa-cors');
const convert = require('koa-convert');
const bodyparser = require('koa-bodyparser');
const staticServer = require('koa-static');
const json = require('koa-json');

const app = new Koa();

app.use(cors());
app.use(convert(bodyparser({
  formLimit: '5mb',
})));
app.use(staticServer(`${__dirname}/static`));
app.use(convert(bodyparser));
app.use(convert(json()));

app.listen(3001);
