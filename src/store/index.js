import Vue from 'vue'
import Vuex from 'vuex'
import { importAll } from 'utils/businessCommonUtils'
import global from './modules/global'
import user from './modules/user'
import loading from './modules/loading'

// 业务模块
const cacheStores = importAll(require.context('../views', true, /store(.*)\.js$/))

Vue.use(Vuex)

const globalFuncs = ['mapState', 'mapGetters', 'mapMutations', 'mapActions']
// 使用频率高，赋给全局变量
globalFuncs.forEach(key => {
  window[key] = Vuex[key]
})

const store = new Vuex.Store({
  modules: {
    global,
    user,
    loading,
    ...cacheStores
  }
})

export default store
