const Koa = require('koa');
const app = new Koa();
const cors = require('koa-cors');
const router = require('./routes/index')
const convert = require('koa-convert');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser')();
const session = require('koa-session');
const staticServer = require('koa-static');
const fs = require('fs')

//中间件
app.use(staticServer(__dirname + '/static'));
app.use(cors())
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(require('./middlewares/returnData'));
app.use(router.routes(), router.allowedMethods());

app.listen(3001);
console.log('app started at port 3001...');
