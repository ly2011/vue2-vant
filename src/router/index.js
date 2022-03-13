import Vue from 'vue'
import Router from 'vue-router'
import { importAllRouter } from 'utils/businessCommonUtils'
import Home from 'views/home'

const cacheRouters = importAllRouter(require.context('../views', true, /router\.js$/))

// TODO 阻止重复点击报错
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
      // meta: { keepAlive: true }
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/test'),
      meta: { title: 'test' }
    },
    ...cacheRouters,
    {
      path: '*',
      redirect: {
        name: 'home'
      }
    }
  ]
})
