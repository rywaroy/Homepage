import IData from '../interface/data';
import IContext from '../interface/context';
import { Context } from 'koa';

function getData(ctx: Context): any{
  /**
   * 返回信息函数
   * - msg {String||Object} 返回信息说明
   * - obj {Object} 其它需要返回的函数
   */
  return async (status: number, msg: string, obj: object) => {
    const data: IData = {
      status: 200,
      msg: '',
      data: {},
    };
    data.status = status;
    data.msg = msg;
    data.data = obj || {};
    return ctx.body = data;
  };
}

module.exports = async function (ctx: IContext, next: () => void) {
  if (!ctx.success) {
    // 成功
    ctx.success = getData(ctx);
  }
  if (!ctx.error) {
    // 失败
    ctx.error = getData(ctx);
  }
  await next();
};
