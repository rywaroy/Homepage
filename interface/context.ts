import { Context } from 'koa';
import IData from './data';

export default interface IContext extends Context {
  success: (status: number, msg: string, obj?: object) => IData
  error: (status: number, msg: string, obj?: object) => IData
}