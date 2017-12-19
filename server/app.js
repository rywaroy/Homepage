
const Koa = require('koa');
const app = new Koa();
var cors = require('koa-cors');
const router = require('koa-router')();
const convert = require('koa-convert');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser')();
const session = require('koa-session');
var staticServer = require('koa-static');
const article = require('./routes/article');
const admin = require('./routes/admin');
const album = require('./routes/album');
const file = require('./routes/file')
const time = require('./routes/time')
const douban = require('./routes/douban')
const fs = require('fs')
// 对于任何请求，app将调用该异步函数处理请求：
// app.use(async (ctx, next) => {
//     await next();
//     ctx.response.type = 'text/html';
//     ctx.response.body = '<h1>Hello, koa2!</h1>';
// });



app.use(staticServer(__dirname + '/static'));



app.use(cors())


//中间件

app.use(convert(bodyparser));
app.use(convert(json()));
app.use(require('./middlewares/returnData'));


router.use('/api/article', article.routes(), article.allowedMethods());
router.use('/api/admin',admin.routes(),admin.allowedMethods());
router.use('/api/album',album.routes(),album.allowedMethods());
router.use('/api/file', file.routes(), file.allowedMethods());
router.use('/api/time', time.routes(), time.allowedMethods());  //time时光网接口
router.use('/api/douban', douban.routes(), douban.allowedMethods());
router.get('/admin', async (ctx) => {
    var htmlFile = await (new Promise(function(resolve, reject){
        
        fs.readFile('./admin/index.html', (err, data) => {
            if (err){
                reject(err);
            }else{
                resolve(data);
            }
        });
    }))
    ctx.type = 'html';
    ctx.body = htmlFile;
});
router.get('/', async (ctx) => {
    var htmlFile = await (new Promise(function(resolve, reject){
        let deviceAgent = ctx.headers['user-agent'].toLowerCase();
        let agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
        if(agentID){
            fs.readFile('./views/index.html', (err, data) => {
                if (err){
                    reject(err);
                }else{
                    resolve(data);
                }
            });
        }else{
            console.log('指到pc网页')
        }
        
    }))
    ctx.type = 'html';
    ctx.body = htmlFile;
});
app.use(router.routes(), router.allowedMethods());

app.listen(3001);
console.log('app started at port 3001...');