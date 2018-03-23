import axios from "axios";
import qs from "qs";
import { message } from 'antd';

const Axios = axios.create({
  // baseURL: "http://localhost:3001/api/",
  baseURL:'http://www.3zsd.cn:3000/api/',
  timeout: 10000,
  responseType: "json",
//   withCredentials: true, // 是否允许带cookie这些
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  }
});

//POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    if (
      config.method === "post" ||
      config.method === "put"
    ) {
      // 序列化
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    message.error(error.message);
    return Promise.reject(error.message);
  }
);

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  res => {
    if (res.data.status !== '0000') {
        message.error(res.data.msg);
        return Promise.reject(res.data.Msg);
    }
    return res;
  },
  error => {

  }
);

export default {
    Axios
}
