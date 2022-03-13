import Vue from 'vue'
import { Toast } from 'vant'
import App from './App'
import './lib'
import router from './router'
import store from './store'
import { environment } from './config'

import 'styles/index.less'

Vue.config.productionTip = false

// const dispatchFunc = store.dispatch
const commitFunc = store.commit

const initAppData = async () => {
  Toast.loading({
    message: '初始化应用，请稍后...', forbidClick: true, duration: 15000, overlay: false
  })

  /**
   * 获取用户信息
   */
  // const user = await nativeApi.getUser()
  // await dispatchFunc('changeUser', user)
  try {
    Toast.clear()
  } finally {
    Toast.clear()
  }
}

router.beforeEach(async (to, from, next) => {
  // 若未登录，则重新登录
  if (!store.state.user.user) {
    await initAppData()
  }
  store.commit('saveEnterPageTime', Date.now())
  next()
})

router.afterEach(() => {
  commitFunc('updateLoading', false)
})

function init () {
  new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount('#app')
}
if (environment === 'local') {
  init()
} else {
  document.addEventListener('deviceready', init, false)
}
