const router = require('koa-router')();
const multer = require('koa-multer');

const storage = multer.diskStorage({  
    //文件保存路径  
    destination: function (req, file, cb) {  
      cb(null, 'static/upload/')  
    },  
    //修改文件名称  
    filename: function (req, file, cb) {  
      var fileFormat = (file.originalname).split(".");  
      cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);  
    }  
  })  
  //加载配置  
  const upload = multer({ storage: storage });  


  router.post('/photos', upload.single('photos'), async (ctx, next) => { 
    ctx.success('1','上传成功',{filename: 'http://' + ctx.request.host + '/upload/' +ctx.req.file.filename}) 
  })  

//   router.post('/photos', upload.single('photos',9), async (ctx, next) => {
//     let filename = []
//     for(let i in ctx.req.file.filename){
//       filename.push('http://' + ctx.request.host + '/upload/' +ctx.req.file.filename[i])
//     } 
//     ctx.success('1','上传成功',{filename: filename}) 
//   }) 


  module.exports = router;