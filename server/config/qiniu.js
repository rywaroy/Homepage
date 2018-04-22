const qiniu = require("qiniu");
// //需要填写你的 Access Key 和 Secret Key
var accessKey = 'Access Key';
var secretKey = 'Secret Key';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
// //要上传的空间
const bucket = 'album';
var options = {
    scope: bucket,
  };
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken = putPolicy.uploadToken(mac);


var config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z0;
var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra();


module.exports = function uploadFile(key) {
    var localFile = `xxx/${key}`
    // 文件上传
    formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr,
        respBody, respInfo) {
        if (respErr) {
            throw respErr;
        }
        if (respInfo.statusCode == 200) {
            console.log(respBody);
        } else {
            console.log(respInfo.statusCode);
            console.log(respBody);
        }
    });
}