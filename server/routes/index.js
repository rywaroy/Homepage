const router = require('koa-router')();
const article = require('./article');
const learn = require('./learn')
const admin = require('./admin');
const album = require('./album');
const file = require('./file');
const time = require('./time');
const douban = require('./douban');
const dytt = require('./dytt');
const weather = require('./weather');
const base = require('./base');

router.use('/api/article', article.routes(), article.allowedMethods());
router.use('/api/learn', learn.routes(), learn.allowedMethods());
router.use('/api/admin', admin.routes(), admin.allowedMethods());
router.use('/api/album', album.routes(), album.allowedMethods());
router.use('/api/file', file.routes(), file.allowedMethods());
router.use('/api/time', time.routes(), time.allowedMethods()); //time时光网接口
router.use('/api/douban', douban.routes(), douban.allowedMethods());
router.use('/api/dytt', dytt.routes(), dytt.allowedMethods());
router.use('/api/weather', weather.routes(), weather.allowedMethods());
router.use('/api/base', base.routes(), base.allowedMethods());

router.get('/admin', async (ctx) => {
  var htmlFile = await (new Promise(function (resolve, reject) {
      fs.readFile('../admin/index.html', (err, data) => {
          if (err) {
              reject(err);
          } else {
              resolve(data);
          }
      });
  }))
  ctx.type = 'html';
  ctx.body = htmlFile;
});

router.get('/', async (ctx) => {
      let htmlFile = await (new Promise(function (resolve, reject) {
          fs.readFile('../pc/index.html', (err, data) => {
              if (err) {
                  reject(err);
              } else {
                  resolve(data);
              }
          });
      }))
      ctx.type = 'html';
      ctx.body = htmlFile;
});

router.get('*', async (ctx) => {
  if (ctx.response.status == 404) {
      let htmlFile = await (new Promise(function (resolve, reject) {
          fs.readFile('../pc/index.html', (err, data) => {
              if (err) {
                  reject(err);
              } else {
                  resolve(data);
              }
          });
      }))
      ctx.type = 'html';
      ctx.body = htmlFile;
  }
});

module.exports = router;