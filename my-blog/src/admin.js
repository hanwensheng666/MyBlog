import Vue from 'vue'
import Admin from './Admin.vue'
import router from './router/adminRouter.js'
//import {store} from './store/adminStore.js'
import {store} from './store/store.js'
Vue.config.productionTip = false

/**
 * 将UTC时间转换为本地时间
 * */
Vue.filter('time', function(value) {
	let date = new Date(value);
	console.log(date);
	let localString = date.toLocaleString();
    return localString;
});
/* eslint-disable no-new */
new Vue({
  el: '#admin',
  store,
  router,
  render: h => h(Admin)
})