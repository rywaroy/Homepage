// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import './assets/reset.css'
import 'element-ui/lib/theme-default/index.css';
// import axiosPlugin from "./server";
// Vue.use(axiosPlugin.plugin);
Vue.use(ElementUI)
Vue.config.productionTip = false

import axiosPlugin from "./server";
Vue.use(axiosPlugin.plugin);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
