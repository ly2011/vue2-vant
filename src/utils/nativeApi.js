import * as config from '@/config/index.js';
import cubeModule from '@/../CubeModule.json';

const _MIDEA_USER = 'MideaUser'; // 用户信息相关
const _MIDEA_BARCODE = 'MideaBarcode'; // 二维码扫描相关
const _MIDEA_MAP = 'MideaMap'; // 地图定位相关
const _MIDEA_PDF = 'MideaPdf'; // 附近展示相关
const _MIDEA_ORG = 'Organization'; // 组织架构相关
const _MIDEA_COMMON = 'MideaCommon'; // 通用组件
export default {
  /**
   * 获取设备平台
   * @returns {number}
   */
  getPlatForm() {
    const u = navigator.userAgent;
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    let flatform = 0;
    if (isAndroid) {
      flatform = 2;
    } else if (isiOS) {
      flatform = 1;
    }
    return flatform;
  },
  /**
   * 拍照或选择图片
   * @param params {object} 参数
   * @return {*}
   */
  getPicture(params) {
    const imgPackageHeader = 'data:image/jpeg;base64,';
    const imgDefaultBase64Code =
      '/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABQAAD/4QMpaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjAtYzA2MCA2MS4xMzQ3NzcsIDIwMTAvMDIvMTItMTc6MzI6MDAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUgV2luZG93cyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozMzM5RDY2ODMyNzQxMUU1QTJENkEwOTg5MjdGQTczNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozMzM5RDY2OTMyNzQxMUU1QTJENkEwOTg5MjdGQTczNiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjMzMzlENjY2MzI3NDExRTVBMkQ2QTA5ODkyN0ZBNzM2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjMzMzlENjY3MzI3NDExRTVBMkQ2QTA5ODkyN0ZBNzM2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgICAgICAgICAgMCAgIDBAMCAgMEBQQEBAQEBQYFBQUFBQUGBgcHCAcHBgkJCgoJCQwMDAwMDAwMDAwMDAwMDAEDAwMFBAUJBgYJDQsJCw0PDg4ODg8PDAwMDAwPDwwMDAwMDA8MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAEAAQAwERAAIRAQMRAf/EAG8AAAMBAAAAAAAAAAAAAAAAAAQFBggBAAIDAAAAAAAAAAAAAAAAAAMEBQcIEAABBAEDBAMAAAAAAAAAAAABAgMEBQYAERIhMUEHYSIUEQACAgAGAgMBAAAAAAAAAAABAhEDACFREgQFMUFhoRQi/9oADAMBAAIRAxEAPwDWfripp7WwyFy7q13MWmoZtmzXIecYLr0ct8U82vsN+RGq06+pHZt67gqkxMZiNMaH73k3U11ip9hexV3QDAafRywd7BxuorKfDchrKaXjLmTtTVS8cmPl9TP5HUIQ8hTiUOcHgokch46EjronP46IldiqV3T/ACTMQfOsH5wHpOfdddfRY62CsrDqIncCSDBIlYzjXPCbBMsGHy76ehyUxNn0kuvq5UTYLZlPFBbcKipJSElPUjc/Gg8LlfnZmzkqQI9E4a7jrf3pWhAKrYrMD4KiZHg64mLW4tr2WqfdWcq1mrASqVLdW85xHZIUskgDwOw0tbc9rbnJJ+c8SHG4tXGTZUgVdAAB9Y//2Q==';
    if (config.environment === 'local') {
      // 本地调试
      return new Promise((resolve, reject) => {
        resolve({
          base64Code: imgDefaultBase64Code,
          base64Url: imgPackageHeader + imgDefaultBase64Code,
        });
      });
    }
    // 测试或者生产环境
    const Camera = {
      DestinationType: {
        THUMB_URL_AND_FILE_URI: -1, // 非cordova自带类型, 返回略缩图和原图的url的json对象
        DATA_URL: 0, // Return image as base64-encoded string
        FILE_URI: 1, // Return image file URI
        NATIVE_URI: 2, // Return image native URI (e.g. assets-library:// on iOS or content:// on Android)
      },
      PictureSourceType: {
        PHOTOLIBRARY: 0,
        CAMERA: 1,
        SAVEDPHOTOALBUM: 2,
      },
      EncodingType: {
        JPEG: 0, // Return JPEG encoded image
        PNG: 1, // Return PNG encoded image
      },
      MediaType: {
        PICTURE: 0, // allow selection of still pictures only. DEFAULT. Will return format specified via DestinationType
        VIDEO: 1, // allow selection of video only, WILL ALWAYS RETURN FILE_URI
        ALLMEDIA: 2, // allow selection from all media types
      },
      Direction: {
        BACK: 0, // Use the back-facing camera
        FRONT: 1, // Use the front-facing camera
      },
    };
    const opt = {
      quality: params.quality || 75,
      destinationType: params.destinationType || Camera.DestinationType.DATA_URL,
      allowEdit: params.allowEdit || false,
      encodingType: params.encodingType || 0,
      saveToPhotoAlbum: params.saveToPhotoAlbum || false,
      sourceType: params.sourceType || Camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: params.mediaType || Camera.MediaType.PICTURE,
      correctOrientation: params.correctOrientation || true,
      cameraDirection: params.cameraDirection || Camera.Direction.BACK,
    };
    return new Promise((resolve, reject) => {
      try {
        navigator.camera.getPicture(
          async data => {
            let base64Url = imgPackageHeader + data;
            if (data.indexOf('file://') > -1) {
              // 安卓照相
              const obj = await this.callApi('MideaCommon', 'getBase64s', [data]);
              console.log('base64Url', base64Url);
              data = obj.base64[0];
              base64Url = imgPackageHeader + obj.base64[0];
              resolve({
                base64Code: data,
                base64Url,
              });
            } else {
              resolve({
                base64Code: data,
                base64Url,
              });
            }
          },
          data => {
            reject(data);
          },
          opt
        );
      } catch (e) {
        console.log('_warn', 'Cordova maybe not exist.');
        reject(e);
      }
    });
  },
  /**
   * 获取通讯录
   * @param fields {string} 查找内容
   * @param options {array} 参数
   * @return {*}
   */
  getContact(fields, options) {
    const promise = new Promise((resolve, reject) => {
      try {
        navigator.service.contacts.find(
          fields,
          msg => {
            resolve(msg);
          },
          msg => {
            reject(msg);
          },
          options
        );
      } catch (e) {
        console.log('_warn', 'Cordova maybe not exist.');
        reject(e);
      }
    });

    return promise;
  },
  /**
   * 获取当前语言
   * 当没有引入cordova的时候，获取浏览器的语言环境，返回值需要处理才能设置语言环境比如 zh-cn 要对应到CN才能设置
   * @return {*|promise}
   */
  language() {
    if (config.environment === 'local') {
      return new Promise((resolve, reject) => {
        resolve({ language: config.language });
      });
    }
    if (window.cordova) {
      return this.callApi(_MIDEA_COMMON, 'language', []);
    }
    const lan = (navigator.language || navigator.browserLanguage).toLowerCase();
    return {
      language: lan,
    };
  },
  /**
   * 退出应用
   * @return {*|promise}
   */
  exit() {
    if (window.cordova) {
      return this.callApi(_MIDEA_COMMON, 'exit', null);
    }
    window.history.go(-1);
  },
  /**
   * 低精度获取用户定位
   * @param options {array} 参数
   * @return {*}
   */
  getUserLocation(options) {
    const promise = new Promise((resolve, reject) => {
      try {
        var options = {
          enableHighAccuracy: false,
          maximumAge: 30000,
          timeout: 27000,
          ...options,
        };
        const onSuccess = position => {
          const coords = position.coords;
          resolve(coords);
        };
        const onError = error => {
          reject(error);
        };
        navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
      } catch (e) {
        console.log('_warn', 'Cordova maybe not exist.');
        reject(e);
      }
    });

    return promise;
  },
  callApi(name, method, params) {
    /**
     * 调用cordova的方法
     * @param name {string} 方法组、类别
     * @param method {string} 方法名称
     * @param params {Array} 参数
     * @return {promise}
     */
    const promise = new Promise((resolve, reject) => {
      if (window.cordova) {
        try {
          window.cordova.exec(
            msg => {
              console.log(msg);
              resolve(msg);
            },
            msg => {
              reject(msg);
            },
            name,
            method,
            params || []
          );
        } catch (e) {
          console.log('_error', 'widget error:', e);
          reject(e);
        }
      } else {
        console.log('_debug', 'Cordova is not exist');
      }
    });

    return promise;
  },
  /**
   * 验证密码，主要用于hr自助认证
   * @return {promise}
   */
  password() {
    return this.callApi(_MIDEA_COMMON, 'authPassword');
  },
  /**
   * 显示菜单
   * @return {*|promise}
   */
  showMenu() {
    return this.callApi(_MIDEA_COMMON, 'showMenu', null);
  },
  /**
   * 显示导航
   * @return {*|promise}
   */
  showNav() {
    return this.callApi(_MIDEA_COMMON, 'showNav', null);
  },
  /**
   * 隐藏导航
   * @return {*|promise}
   */
  hideNav() {
    return this.callApi(_MIDEA_COMMON, 'hideNav', null);
  },
  /**
   * 后退
   * @return {*|promise}
   */
  goBack() {
    return this.callApi(_MIDEA_COMMON, 'goBack', null);
  },
  /**
   * 开始监听手机摇动
   * @return {*|promise}
   */
  shake() {
    return this.callApi(_MIDEA_COMMON, 'shake', null);
  },
  /**
   * 停止监听手机摇动
   * @return {*|promise}
   */
  shakeStop() {
    return this.callApi(_MIDEA_COMMON, 'shakeStop', null);
  },
  /**
   * 显示悬浮菜单
   * @return {*|promise}
   */
  showFloat() {
    return this.callApi(_MIDEA_COMMON, 'showFloat', null);
  },
  /**
   * 隐藏悬浮菜单
   * @return {*|promise}
   */
  hideFloat() {
    return this.callApi(_MIDEA_COMMON, 'hideFloat', null);
  },
  /**
   * 获取用户信息
   * @return {*|promise}
   */
  getUser() {
    // return this.callApi(_MIDEA_USER, 'getUser', null)
    if (config.environment === 'local') {
      return Promise.resolve(config.userTest);
    }
    return this.callApi(_MIDEA_USER, 'getUser', []);
  },
  /**
   * 启动扫码
   * @return {*|promise}
   */
  scan() {
    return this.callApi(_MIDEA_BARCODE, 'scan', null);
  },
  /**
   * 启动扫码
   * @return {*|promise}
   */
  scanNow() {
    return this.callApi(_MIDEA_BARCODE, 'scanNow', null);
  },
  /**
   * 获取扫码结果
   * @return {*|promise}
   */
  getScanExtra() {
    return this.callApi(_MIDEA_BARCODE, 'getScanExtra', null);
  },
  /**
   * 获取位置信息
   * @param arr {array} 参数
   * @return {*|promise}
   */
  location(arr) {
    return this.callApi(_MIDEA_MAP, 'location', arr);
  },
  /**
   * 开始更新位置信息
   * @param arr {array} 参数
   * @return {*|promise}
   */
  startUpdatingLocation(arr) {
    return this.callApi(_MIDEA_MAP, 'startUpdatingLocation', arr);
  },
  /**
   * 停止更新位置信息
   * @return {*|promise}
   */
  stopUpdatingLocation() {
    return this.callApi(_MIDEA_MAP, 'stopUpdatingLocation', null);
  },
  /**
   * 导航
   * @param arr {array} 参数
   * @return {*|promise}
   */
  navigation(arr) {
    return this.callApi(_MIDEA_MAP, 'navTo', arr);
  },
  /**
   * 组织架构单选
   * @return {*|promise}
   */
  orgChoose() {
    return this.callApi(_MIDEA_USER, 'orgChoose', null);
  },
  /**
   * 组织架构多选
   * @param p {array} 参数
   * @return {*|promise}
   */
  orgMuChoose(p) {
    return this.callApi(_MIDEA_USER, 'orgMuChoose', p);
  },
  /**
   * 根据组织id获取组织内容
   * @param p {array} 参数
   * {
      "withChild": true,
      "withUser": true,
      "departId": orgId
    }
   * @return {*|promise}
   */
  fetchDepart(p) {
    return this.callApi(_MIDEA_ORG, 'fetchDepart', p);
  },
  /**
   * 改变状态栏颜色-仅IOS
   * @param p {array} 参数 [r, g, b]
   * @return {*|promise}
   */
  changeColor(p) {
    return this.callApi(_MIDEA_COMMON, 'statusBarColor', p);
  },
  /**
   * 登出，注销用户
   * @return {*|promise}
   */
  logout() {
    return this.callApi(_MIDEA_COMMON, 'logout', null);
  },
  /**
   * 获取webview信息
   * @return {*|promise}
   */
  webview() {
    return this.callApi(_MIDEA_COMMON, 'webview', null);
  },
  /**
   * 获取屏幕信息
   * @return {*|promise}
   */
  screen() {
    return this.callApi(_MIDEA_COMMON, 'screen', null);
  },
  /**
   * 获取额外启动参数
   * @param params {array} 参数
   * @return {*|promise}
   */
  getExtra(params) {
    console.log([cubeModule.identifier]);
    return this.callApi(_MIDEA_COMMON, 'getExtra', params || [cubeModule.identifier]);
  },
  /**
   * 获取设备信息
   * @return {*|promise}
   */
  getDeviceInfo() {
    return this.callApi(_MIDEA_COMMON, 'getDeviceInfo', null);
  },
  /**
   * 用外部浏览器打开链接
   * @param url {string} 链接地址url
   * @return {*|promise}
   */
  openUrl(url) {
    return this.callApi(_MIDEA_COMMON, 'openSysBrowser', [url]);
  },
  /**
   * h5事件监听
   * @param params {array} 参数
   * @return {*|promise}
   */
  statistics(params) {
    return this.callApi(_MIDEA_COMMON, 'onEvent', params);
  },
  /**
   * 分享
   * @param params {array} 参数
   * @return {*|promise}
   */
  share(params) {
    return this.callApi(_MIDEA_COMMON, 'share', params);
  },
  /**
   * 打开应用页面
   * @return {*|promise}
   */
  showAppView() {
    return this.callApi(_MIDEA_COMMON, 'showAppView', ['messageView']);
  },
  /**
   * 打开时间日期选择
   * @param params {array} 参数
   * @return {*}
   */
  showPicker(params) {
    const promise = new Promise((resolve, reject) => {
      if (window.datePicker) {
        params = {
          date: new Date(),
          mode: 'date',
          type: 'day',
          ...params,
        };

        window.datePicker &&
          window.datePicker.show(params, date => {
            resolve(date);
          });
      } else {
        console.log('_debug', 'datePicker is not exist');
      }
    });
    return promise;
  },
  /**
   * 打开通讯录
   * @return {*|promise}
   */
  getPhoneMan() {
    return this.callApi(_MIDEA_USER, 'getContact', null);
  },
  /**
   * 打开个人设置页面
   * @return {*|promise}
   */
  goPersonalSet() {
    return this.callApi(_MIDEA_COMMON, 'showSetView', null);
  },
  /**
   * 打开“我的”页面
   * @return {*|promise}
   */
  goMyView() {
    return this.callApi(_MIDEA_COMMON, 'showMyView', null);
  },
  /**
   * 打开widget
   * @param params {array} 参数
   * @return {*|promise}
   */
  showWidget(params) {
    return this.callApi(_MIDEA_COMMON, 'showWidget', params);
  },
  /**
   * 显示键盘
   * @return {*|promise}
   */
  showInput() {
    return this.callApi(_MIDEA_COMMON, 'showInput', null);
  },
  /**
   * 隐藏键盘
   * @return {*|promise}
   */
  hideInput() {
    return this.callApi(_MIDEA_COMMON, 'hideInput', null);
  },
  /**
   * 打开消息页面
   * @return {*|promise}
   */
  showMessageView() {
    return this.callApi(_MIDEA_COMMON, 'showAppView', ['messageView']);
  },
  /**
   * 批量将图片转换成base64码
   * @param pictureList {array} 图片列表
   * @return {*|promise}
   */
  getBase64CodeFromPictures(pictureList) {
    return this.callApi(_MIDEA_COMMON, 'getBase64s', pictureList);
  },
  /**
   * 跳转到系统设置页面，
   * @param arr arr[0]为要跳转的对应的设置页面，暂时支持  蜂窝网络：CellularNetWork，WIFI：WIFI
   * @returns {*}
   */
  gotoSystemSetting(arr) {
    return this.callApi(_MIDEA_COMMON, 'gotoSystemSetting', arr);
  },
  /**
   * 附件展示
   * @param param {array} 附件链接url列表
   * @return {Promise}
   */
  showPdf(param) {
    return this.callApi(_MIDEA_PDF, 'showPdf', param);
  },
  /**
   * 附件txt展示
   * @param param {array} 参数
   * @return {Promise}
   */
  showTxt(param) {
    return this.callApi(_MIDEA_PDF, 'showTxt', param);
  },
  /**
   * @description 获取底座密码
   * @returns {Promise}
   */
  getUserPassword() {
    return this.callApi(_MIDEA_USER, 'getUserPassword', []);
  },
  /**
   * @description 打电话（底座有bug）
   * @param phoneNumber {string}
   * @returns {Promise}
   */
  financeCall(phoneNumber) {
    return this.callApi(_MIDEA_COMMON, 'callPhone', [phoneNumber]);
  },
  /**
   *  是否禁用webview橡皮筋效果
   * @param params params '1': 启用 '0': 禁止
   * @returns {*}
   */
  setBounces(params) {
    return this.callApi(_MIDEA_COMMON, 'setBounces', [params]);
  },
};
