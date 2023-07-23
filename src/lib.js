import Vue from 'vue';
// import FastClick from 'fastclick';
import { Plugin } from 'vue-fragment';

import 'plugins/vant.js';
import 'plugins/composition-plugin.js';
import filters from 'filters/index.js';
// import nativeApi from 'utils/nativeApi';
// import axios from 'utils/request';
// import utils from 'utils';
// import * as config from 'config';
import IEmpty from 'components/basic/empty/index.vue';
import ITable from 'components/basic/table/index.vue';
import ITabbar from 'components/basic/tabbar/index.vue';

// 导入封装好的全部公共 UI组件
// import './components/basic/install';

// Vue.prototype.$config = config;
// Vue.prototype.$nativeApi = nativeApi;
// Vue.prototype.$http = axios;
// Vue.prototype.$tools = {};
// Object.values(utils).forEach(fnObj => {
//   Object.assign(Vue.prototype.$tools, fnObj);
// });

Vue.use(Plugin);
Vue.use(filters);
Vue.component(IEmpty.name, IEmpty);
Vue.component(ITable.name, ITable);
Vue.component(ITabbar.name, ITabbar);

// FastClick.attach(document.body);
// FastClick.prototype.focus = function (targetElement) {
//   targetElement.focus();
// };
