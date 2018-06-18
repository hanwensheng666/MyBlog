// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Detail from './Detail.vue'
import {store} from './store/store.js'
Vue.config.productionTip = false
/* eslint-disable no-new */


Vue.filter('time', function(value) {
	let date = new Date(value);
	let localString = date.toLocaleString();
    return localString;
});
new Vue({
  el: '#detail',
  store,
  render: h => h(Detail)
})
