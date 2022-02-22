import { environment, baseFileUrl } from '@/config'

/**
 * 获取文件大小
 * @param {Number|String} size
 * @returns {String}
 */
export const getFileSize = (size) => {
  const fsize = parseFloat(size, 2)
  let fileSizeString
  if (fsize < 1024) {
    fileSizeString = `${fsize.toFixed(2) }B`
  } else if (fsize < 1048576) {
    fileSizeString = `${(fsize / 1024).toFixed(2) }KB`
  } else if (fsize < 1073741824) {
    fileSizeString = `${(fsize / 1024 / 1024).toFixed(2) }MB`
  } else if (fsize < 1024 * 1024 * 1024 * 1024) {
    fileSizeString = `${(fsize / 1024 / 1024 / 1024).toFixed(2) }GB`
  } else if (fsize < 1024 * 1024 * 1024 * 1024 * 1024) {
    fileSizeString = `${(fsize / 1024 / 1024 / 1024 / 1024).toFixed(2) }TB`
  } else {
    fileSizeString = '0B'
  }
  return fileSizeString
}

/**
 * 获取文件的后缀名
 * @param {String} fileName
 * @returns {String}
 */
export const getFileExt = (fileName) => {
  if (fileName.lastIndexOf('.') === -1) {
    return fileName
  }
  const pos = fileName.lastIndexOf('.') + 1
  return fileName.substring(pos, fileName.length).toLowerCase()
}

/**
 * 验证是否为图片
 * @param {String} fileName
 * @returns {Boolean}
 */
export const checkImage = (fileName) => /(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG|BMP)$/gi.test(fileName)

/**
  * 验证是否为pdf
  * @param fileName
  * @returns {Boolen}
  */
export const checkPdf = (fileName) => /(pdf|PDF)$/ig.test(fileName)
/**
 * 验证是否为视频
 * @param {String} fileName
 * @return {Boolean}
 */
export const checkVideo = (fileName) => /(mp4|mp3|flv|wav)$/gi.test(fileName)

/**
 * 验证是否为文档
 * @param {String} fileName
 * @returns {Boolean}
 */
export const checkDocument = (fileName) => /(doc|docx|xls|xlsx|pdf|txt|ppt|pptx)$/gi.test(fileName)

/**
 * 根据环境替换传入表单附件组件uploader中图片的路径
 * @param {Array} fileList
 * @returns {Array}
 */
export const replaceImgUrlByENV = (fileList, keyName = 'url') => {
  const prefixUrl = baseFileUrl[environment]
  if (!fileList.length) return []
  return fileList.map(item => {
    if (/^http/.test(item[keyName])) {
      item[keyName] = item[keyName].replace(/cdn.qq.com/, prefixUrl)
    } else {
      item[keyName] = prefixUrl + item[keyName]
    }
    const ext = getFileExt(item[keyName])
    // 目前vant版本不支持展示文件名，用fileBaseUrl代替url，用fileName代替url实现展示文件名
    if (!checkImage(ext)) {
      item.fileBaseUrl = item[keyName]
      item.url = item.filename || item.name
    }
    console.log('处理过后的图片对象', item)
    return item
  })
}
