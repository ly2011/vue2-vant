import axios from 'axios';
// import Qs from 'qs'
// import store from '@/store'
import { environment, baseUrl, invalidRequestCode } from '@/config';
import nativeApi from '@/utils/nativeApi';

axios.defaults.baseURL = baseUrl[environment]; // 接口地址
// 设置默认请求头
axios.defaults.headers.common['Content-Type'] = 'application/json;text/plain;charset=UTF-8';
const { NODE_ENV } = process.env;
const isDev = NODE_ENV === 'development';

const needTransformMethods = ['post', 'POST', 'put', 'PUT', 'delete', 'DELETE'];

// 创建axios实例
const service = axios.create({
  timeout: 60000,
  crossDomain: true,
  xsrfCookieName: 'xsrf-token',
});

// request拦截器，设置token、POST传参序列化
service.interceptors.request.use(
  config => {
    const { method, useQs } = config;
    if (!config.data) {
      config.data = {};
    }
    // const {
    //   state: {
    //     user: { user = {} }
    //   }
    // } = store

    const user = JSON.parse(sessionStorage.getItem('user') || '{}');

    config.headers = {
      accessToken: user ? user.ssoToken : '',
      ...config.headers,
    };
    if (!(!useQs && useQs !== undefined) && needTransformMethods.includes(method)) {
      //  config.data = Qs.stringify(config.data, { allowDots: true })
    }

    // config.data.token = token || ''
    return config;
  },
  error => Promise.reject(error)
);

// respone拦截器
service.interceptors.response.use(
  async response => {
    const { data } = response || {};
    if (!isDev && data) {
      const { code } = data;
      if (invalidRequestCode.includes(code)) {
        await nativeApi.showAppView();
      }
    }
    return response;
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '错误请求';
          break;
        case 401:
          err.message = '未授权，请重新登录';
          break;
        case 404:
          err.message = '接口没有找到（代码 404），请联系管理员';
          break;
        default:
          err.message = `连接错误${err.response.status}`;
      }
    } else {
      err.message = '连接到服务器失败';
    }
    return Promise.resolve(err.response);
  }
);

export default service;
