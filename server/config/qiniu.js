const qiniu = require('qiniu');
// //需要填写你的 Access Key 和 Secret Key
const accessKey = 'Access Key';
const secretKey = 'Secret Key';
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
// //要上传的空间
const bucket = 'album';
const options = {
	scope: bucket,
};
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);


const config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z0;
const formUploader = new qiniu.form_up.FormUploader(config);
const putExtra = new qiniu.form_up.PutExtra();


module.exports = function uploadFile(key) {
	const localFile = `xxx/${key}`;
	// 文件上传
	return new Promise((resolve, reject) => {
		formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr, respBody, respInfo) {
			if (respErr) {
				throw respErr;
			}
			if (respInfo.statusCode === 200) {
				console.log(respBody);
				resolve();
			} else {
				console.log(respInfo.statusCode);
				console.log(respBody);
				reject();
			}
		});
	});
};
