import { Context } from 'koa';
import { IRouterContext } from 'koa-router';
import IData from './data';

export default interface IContext extends Context, IRouterContext {
  success: (status: number, msg: string, obj?: object) => IData
  error: (status: number, msg: string, obj?: object) => IData
}
