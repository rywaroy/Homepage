import axios from "axios";
import qs from "qs";
import { Message } from "element-ui";
import router from '../router'
import plus from '../public'
// import store from '../store'

const Axios = axios.create({
  // baseURL: "http://test.adsuper.cn:8084/najin_api/v1",
  baseURL: "localhost:3001/api",
  timeout: 10000,
  responseType: "json",
  withCredentials: true, // 是否允许带cookie这些
  // headers: {
  //   "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  // }
});

//POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    if (
      config.method === "post" ||
      config.method === "put" ||
      config.method === "delete"
    ) {
      // 序列化
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    Message({  //  饿了么的消息弹窗组件,类似toast
      showClose: true,
      message: error,
      type: "error.data.error.message"
    });
    return Promise.reject(error.data.error.message);
  }
);

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  res => {
    if (res.data.returnNo == '0014') {
      Message({
        message: '登录失效，请重新登录',
        type: "error",
      });
      // plus.cook.delete('userInfo')  //清空cookie
      // store.commit('SET_USERINFO', {})//清空store
      setTimeout(()=>{
        router.push({name:'login'})
      },1000)
      return Promise.reject(res.data.returnInfo);
    }
    if(res.data.returnNo != '0000'){
      Message({
        message: res.data.returnInfo,
        type: "error",
      });
      return Promise.reject(res.data.returnInfo);
    }
    return res;
  },
  error => {
    // 用户登录的时候会拿到一个基础信息,比如用户名,token,过期时间戳
    // 直接丢localStorage或者sessionStorage
    // console.log(error)
    // if (!window.localStorage.getItem("loginUserBaseInfo")) {
    //   // 若是接口访问的时候没有发现有鉴权的基础信息,直接返回登录页
    //   router.push({
    //     path: "/login"
    //   });
    // } else {
    //   // 若是有基础信息的情况下,判断时间戳和当前的时间,若是当前的时间大于服务器过期的时间
    //   // 乖乖的返回去登录页重新登录
    //   let lifeTime =
    //     JSON.parse(window.localStorage.getItem("loginUserBaseInfo")).lifeTime *
    //     1000;
    //   let nowTime = (new Date()).getTime(); // 当前时间的时间戳
    //   if (nowTime > lifeTime) {
    //     Message({
    //       showClose: true,
    //       message: "登录状态信息过期,请重新登录",
    //       type: "error"
    //     });
    //     router.push({
    //       path: "/login"
    //     });
    //   }
    // }
    // 下面是接口回调的status ,因为我做了一些错误页面,所以都会指向对应的报错页面
    // if (error.response.status === 403) {
    //   router.push({
    //     path: "/error/403"
    //   });
    // }
    // if (error.response.status === 500) {
    //   router.push({
    //     path: "/error/500"
    //   });
    // }
    // if (error.response.status === 502) {
    //   router.push({
    //     path: "/error/502"
    //   });
    // }
    // if (error.response.status === 404) {
    //   // router.push({
    //   //   path: "/error/404"
    //   // });
    // }
    // 返回 response 里的错误信息
    // return Promise.reject(error.data.error.message);
  }
);

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
  plugin: {
    install: function (Vue, Option) {
      Object.defineProperty(Vue.prototype, "$http", {value: Axios});
    },
  },
  axios:Axios
}



