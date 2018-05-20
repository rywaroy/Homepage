const db = require('../database');


let isLogin = exports.isLogin = async function (ctx, next) {
  
   let token = ctx.request.body.token;
   if(!token){
    token = ctx.query.token;
	}
	let data = await checkToken(token)

	if(data.length == 1){
		await next();
	}else{
		ctx.error('0014','登录失效')
	}
} 

function checkToken(token){
	return new Promise(function (resolve, reject) {
        db.query('select * from admin where token = "' + token + '"', function (err, row) {
            if (err) {
                reject(err)
            } else {
                resolve(row)
            }
        })
    })
}