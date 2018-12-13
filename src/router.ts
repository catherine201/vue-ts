import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import capture from './views/capture.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/capture',
      name: 'capture',
      component: capture,
    },
    {
      path: '/detail',
      name: 'detail',
      component: r => (<any>require).ensure([], () => r(require('./views/detail.vue')), 'detail'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/ui',
      name: 'ui',
      component: () => import('./components/ui.vue'),
    },
    {
      path: '/purchase',
      name: 'purchase',
      component: () => import('./views/purchase.vue'),
    },
  ],
});
