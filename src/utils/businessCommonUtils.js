import { isArray, isObject } from 'lodash'
import { Dialog, Toast } from 'vant'
import { attachmentInfoUrl } from '@/config'
import nativeApi from './nativeApi'
import { getFileExt, checkPdf, checkDocument } from './file'
import request from './request'

/**
 * 自动加载对应的模块
 * @param {Object} r 通过 require.context 加载的模块
 */
export const importAll = r => {
  const caches = {}
  // eslint-disable-next-line no-return-assign
  r.keys().forEach(key => {
    // 截取路径作为组件名(必须是文件夹形式)
    const storeName = r(key)?.default?.moduleName
    const pageName = r(key)?.default?.name
    const compName = storeName || pageName
    if (!compName) {
      console.warn(`${key}-存在未定义模块名的${storeName ? 'store' : 'page'}，为了不影响正常使用，请检查代码`)
    }
    caches[compName] = r(key).default || r[key]
  })
  return caches
}

/**
 * 自动加载对应的路由配置
 * @param {Object} r 通过 require.context 加载的模块
 */
export const importAllRouter = r => {
  const caches = []
  // eslint-disable-next-line no-return-assign
  r.keys().forEach(key => {
    const routerItem = r(key).default || r[key]
    if (isArray(routerItem)) {
      caches.push(...routerItem)
    } else if (isObject(routerItem)) {
      caches.push(routerItem)
    } else {
      console.warn(`${key}-存在未定义路由，为了不影响正常使用，请检查代码`)
    }
  })
  return caches
}

/**
 * 系统错误，退出应用
 */
export const showSysErrMsg = (msg) => {
  Dialog.alert({
    message: msg || '无操作权限，请联系系统管理员开通权限！'
  }).then(() => {
    if (nativeApi.exit) nativeApi.exit()
  })
}

export const hasOwn = (obj, attr) => Object.prototype.hasOwnProperty.call(obj, attr)
export const getResponse = (response, errorCallback) => {
  const { data } = response || {}
  if (data && data.code !== 0) {
    if (errorCallback) {
      errorCallback(data)
    } else {
      const msg = data.message || data.msg || '操作失败'
      Toast.fail(msg)
    }
  }
  return data && hasOwn(data, 'data') ? data.data : data
}

// 检测附件
export const attachmentCheck = async (fileUrl, token, fileId) => {
  if (!fileUrl) return

  if (checkPdf(fileUrl)) {
    const pages = [{ url: fileUrl }]
    nativeApi.showPdf(pages)
    return
  }
  if (!checkDocument(fileUrl)) return Toast.fail('该文件类型不支持在线预览！')

  Toast.loading()
  const params = {
    subPathName: fileUrl, // 后端返回的文件路径
    alias: 'mas.x2pr.file',
    docType: getFileExt(fileUrl),
    exParam: fileId, // 文件服务器 文件ID
    fdType: 'sap',
    quality: 'pdf',
    attachment_stamp: '',
    token // 登录人token
  }
  const result = await request.get(attachmentInfoUrl, { params })
  console.log('result: 预览其他文件', result)
  const { data: response } = result
  // const response = getResponse(result) || {}
  Toast.clear()
  if (!response) {
    return
  }
  if (response.pages && response.pages.length > 0) {
    nativeApi.showPdf(response.pages)
  } else {
    Toast.fail(response.msg || '文件不存在！')
  }
}
