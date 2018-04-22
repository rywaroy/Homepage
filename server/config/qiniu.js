const qiniu = require("qiniu");
//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'Access_Key';
qiniu.conf.SECRET_KEY = 'Secret_Key';
//要上传的空间
bucket = 'album';

export default function uploadFile(key) {
    let token = new qiniu.rs.PutPolicy(bucket+":"+key).token() //生成上传 Token
    let filePath = `../static/upload/${key}` //要上传文件的本地路径
    let extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(token, key, filePath, extra, function(err, ret) {
        if(!err) {
          // 上传成功， 处理返回值
          console.log(ret.hash, ret.key, ret.persistentId);       
        } else {
          // 上传失败， 处理返回代码
          console.log(err);
        }
      });
}