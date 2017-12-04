function data (ctx) {
  /**
   * 返回信息函数
   * - msg {String||Object} 返回信息说明
   * - obj {Object} 其它需要返回的函数
   */
  return async (status,msg,obj) => {

  	var data = {}
  	data.status = status;
  	data.msg = msg;
  	data.data = obj || new Object;
    return ctx.body = data;  
  }

}

module.exports = async function (ctx, next) {
  if(!ctx.success)
    // 成功
    ctx.success = data(ctx);
  if(!ctx.error)
    // 失败
    ctx.error = data(ctx);

  await next();
}