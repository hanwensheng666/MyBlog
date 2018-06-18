// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import {store} from './store/store.js'

Vue.config.productionTip = false
/**
 * 将UTC时间转换为本地时间
 * */
Vue.filter('time', function(value) {
	let date = new Date(value);
	let localString = date.toLocaleString();
    return localString;
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
