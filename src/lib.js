import Vue from 'vue'
import IEmpty from 'components/basic/empty'
import ITable from 'components/basic/table'
import FastClick from 'fastclick'
import { Plugin } from 'vue-fragment'

import 'plugins/vant'
import filters from 'filters'
import nativeApi from 'utils/nativeApi'
import axios from 'utils/request'
import utils from 'utils'
import * as config from 'config'

// 导入封装好的全部公共 UI组件
import './components/basic/install'

Vue.prototype.$config = config
Vue.prototype.$nativeApi = nativeApi
Vue.prototype.$http = axios
Vue.prototype.$tools = {}
Object.values(utils).forEach((fnObj) => {
  Object.assign(Vue.prototype.$tools, fnObj)
})

Vue.use(Plugin)
Vue.use(filters)
Vue.component(IEmpty.name, IEmpty)
Vue.component(ITable.name, ITable)

FastClick.attach(document.body)
FastClick.prototype.focus = function (targetElement) {
  targetElement.focus()
}
