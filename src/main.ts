import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import 'babel-polifill';   // 提供了一些低版本es标准对高级特性的实现 比如Generator, Set
import './utils/rem.js'; // 做移动端适配
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import * as FastClick from 'fastclick';
FastClick.attach(document.body);
import VConsole from 'vconsole';
const vConsole = new VConsole();
const VueTouch = require('vue-touch');
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
  preLoad: 1.3, // 预压高度的比例
  error: './assets/images/error.png', // 图像的加载失败时 显示的error图标
  loading: './assets/images/loading.gif', // 图像正常加载时 显示的loading图标
  attempt: 1, // 图像尝试加载 次数
});
Vue.use(MintUI);
// import * as VueTouch from 'node_modules/vue-touch/dist/vue-touch.js';
Vue.use(VueTouch, {name: 'v-touch'});

Vue.use(Vuetify);
Vue.config.productionTip = false;
// Vue.prototype.$api = require('./api').createApi(require('./api/config').config); // 最终写法

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
