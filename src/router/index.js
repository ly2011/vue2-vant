import Vue from 'vue';
import Router from 'vue-router';
import { importAllRouter } from 'utils/businessCommonUtils';
import Home from 'views/home.vue';

const cacheRouters = importAllRouter(require.context('../views', true, /router\.js$/));

console.warn(cacheRouters, 'cacheRouters =======>');

// TODO 阻止重复点击报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { keepAlive: false, tabbar: true },
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/test.vue'),
      meta: { title: 'test' },
    },
    {
      path: '/composition-api/basic-form',
      name: 'composition-api-basic-form',
      component: () => import('@/views/composition-api/basic-form/index.vue'),
      meta: { title: 'composition-api-basic-form', tabbar: true },
    },
    {
      path: '/topic-list',
      name: 'topic-list',
      component: () => import('@/views/composition-api/topic-list/index.vue'),
      meta: { title: 'topic-list' },
    },
    {
      path: '/topic-detail/:id',
      name: 'topic-detail',
      component: () => import('@/views/composition-api/topic-detail/index.vue'),
      meta: { title: 'topic-detail' },
    },
    {
      path: '/options-api/basic-form',
      name: 'options-api-basic-form',
      component: () => import('@/views/options-api/basic-form'),
      meta: { title: 'options-api-basic-form', tabbar: true },
    },
    ...cacheRouters,
    {
      path: '*',
      redirect: {
        name: 'home',
      },
    },
  ],
});
