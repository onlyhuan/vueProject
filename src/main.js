// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import moment from 'moment'
Vue.filter('fmtdate',(date,fmtStr)=>{
  return moment(date).format(fmtStr)
})

import Mint from 'mint-ui';
Vue.use(Mint);


import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8899/api/';
Vue.prototype.$http = axios;
Vue.prototype.axios = axios;

import './assets/css/mui.css'
import './assets/fonts/mui.ttf'

// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  created() {
    // 设置axios的拦截器
    // 发送请求之前
    // Add a request interceptor
    this.axios.interceptors.request.use((config)=> {
      // console.log(this);
      // Do something before request is sent
      this.$indicator.open('正在加载...');
      return config;
    }, (error)=> {
      // Do something with request error
      return Promise.reject(error);
    });

    // Add a response interceptor
    this.axios.interceptors.response.use((response)=> {
      // Do something with response data
      this.$indicator.close();
      
      return response;
    },(error)=> {
      // Do something with response error
      return Promise.reject(error);
    });
  }
})
