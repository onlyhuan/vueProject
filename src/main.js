// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import moment from 'moment'
Vue.filter('fmtdate',(date,fmtStr)=>{
  return moment(date).format(fmtStr)
})


import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8899/api/';
Vue.prototype.$http = axios;

import './assets/css/mui.css'
import './assets/fonts/mui.ttf'

// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
