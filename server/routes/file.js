const router = require('koa-router')();
const multer = require('koa-multer');
const uploadQiniu = require('../config/qiniu');

const storage = multer.diskStorage({
  // 文件保存路径
  destination(req, file, cb) {
    cb(null, 'static/upload/');
  },
  // 修改文件名称
  filename(req, file, cb) {
    const fileFormat = (file.originalname).split('.');
    cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1]);
  },
});
// 加载配置
const upload = multer({
  storage,
});


router.post('/photos', upload.single('photos'), async (ctx, next) => {
  try {
    await uploadQiniu(ctx.req.file.filename);
    ctx.success('0000', '上传成功', {
      filename: `http://p7kx9r1er.bkt.clouddn.com/${ctx.req.file.filename}`,
    });
  } catch (err) {
		ctx.error('0011', '上传失败');
	}
});

//   router.post('/photos', upload.single('photos',9), async (ctx, next) => {
//     let filename = []
//     for(let i in ctx.req.file.filename){
//       filename.push('http://' + ctx.request.host + '/upload/' +ctx.req.file.filename[i])
//     }
//     ctx.success('1','上传成功',{filename: filename})
//   })


module.exports = router;
