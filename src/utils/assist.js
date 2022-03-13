import { Toast } from 'vant';

export const removeNoChild = data => data.filter(item => item.children && item.children.length);

export const sleep = time => new Promise(resolve => setTimeout(resolve, time));

export function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

/**
 * 判断值是否为空
 * @param {String|Number|Object|Array} value
 * @param {Boolean} allowBlank 允许空字符串
 */
export const isEmpty = (value, allowBlank) =>
  value === null || value === undefined || (allowBlank ? false : value === '');

/**
 * 字符串类型空校验
 * @param {String} value
 * @returns Boolean
 */
export const stringIsEmpty = value => {
  if (typeof value === 'string') {
    // eslint-disable-next-line no-param-reassign
    value = value.trim();
  }
  if (value === undefined || value === null || value === '') {
    return true;
  }
  return false;
};

/**
 * 数字千分位分开
 * @param {Number} num
 * @returns {String}
 */
export const formatNum = num => {
  let str = `${num}`;
  let newStr = '';
  let count = 0;

  if (str.indexOf('.') === -1) {
    for (let i = str.length - 1; i >= 0; i--) {
      if (count % 3 === 0 && count !== 0) {
        newStr = `${str.charAt(i)},${newStr}`;
      } else {
        newStr = str.charAt(i) + newStr;
      }
      count++;
    }
    str = `${newStr}.00`; // 自动补小数点后两位
    return str;
  }
  for (let i = str.indexOf('.') - 1; i >= 0; i--) {
    if (count % 3 === 0 && count !== 0) {
      newStr = `${str.charAt(i)},${newStr}`; // 碰到3的倍数则加上“,”号
    } else {
      newStr = str.charAt(i) + newStr; // 逐个字符相接起来
    }
    count++;
  }
  str = newStr + `${str}00`.substr(`${str}00`.indexOf('.'), 3);
  return str;
};

/**
 * 将数字转换成对应的中文 将阿拉伯数字翻译成中文的大写数字
 * @param {Number} num
 * @returns {String}
 * @example
 * num 比如:1对应一 11：十一 101:一百零一
 */
export const numberToChinese = num => {
  const AA = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  const BB = ['', '十', '百', '仟', '萬', '億', '点', ''];
  const a = `${num}`.replace(/(^0*)/g, '').split('.');
  let k = 0;
  let re = '';
  for (let i = a[0].length - 1; i >= 0; i--) {
    switch (k) {
      case 0:
        re = BB[7] + re;
        break;
      case 4:
        if (!new RegExp(`0{4}//d{${a[0].length - i - 1}}$`).test(a[0])) {
          re = BB[4] + re;
        }
        break;
      case 8:
        re = BB[5] + re;
        // eslint-disable-next-line prefer-destructuring
        BB[7] = BB[5];
        k = 0;
        break;
      default:
    }
    if (k % 4 === 2 && a[0].charAt(i + 2) !== 0 && a[0].charAt(i + 1) === 0) {
      re = AA[0] + re;
    }
    if (a[0].charAt(i) !== 0) {
      re = AA[a[0].charAt(i)] + BB[k % 4] + re;
    }
    k++;
  }

  if (a.length > 1) {
    // 加上小数部分(如果有小数部分)
    re += BB[6];
    for (let i = 0; i < a[1].length; i++) {
      re += AA[a[1].charAt(i)];
    }
  }
  if (re === '一十') {
    re = '十';
  }
  if (re.match(/^一/) && re.length === 3) {
    re = re.replace('一', '');
  }
  return re;
};

/**
 * 将数字转换为大写金额
 * @param {Number} num
 * @returns {String}
 */
export const toChinese = num => {
  // 判断如果传递进来的不是字符的话转换为字符
  if (typeof num === 'number') {
    num = num.toString();
  }
  num = num.replace(/,/g, ''); // 替换tomoney()中的“,”
  num = num.replace(/ /g, ''); // 替换tomoney()中的空格
  num = num.replace(/￥/g, ''); // 替换掉可能出现的￥字符
  if (Number.isNaN(num)) {
    // 验证输入的字符是否为数字
    // alert('请检查小写金额是否正确')
    return '';
  }
  // 字符处理完毕后开始转换，采用前后两部分分别转换
  const part = String(num).split('.');
  let newchar = '';
  // 小数点前进行转化
  for (let i = part[0].length - 1; i >= 0; i--) {
    if (part[0].length > 10) {
      return '';
      // 若数量超过拾亿单位，提示
    }
    let tmpnewchar = '';
    const perchar = part[0].charAt(i);
    switch (perchar) {
      case '0':
        tmpnewchar = `零${tmpnewchar}`;
        break;
      case '1':
        tmpnewchar = `壹${tmpnewchar}`;
        break;
      case '2':
        tmpnewchar = `贰${tmpnewchar}`;
        break;
      case '3':
        tmpnewchar = `叁${tmpnewchar}`;
        break;
      case '4':
        tmpnewchar = `肆${tmpnewchar}`;
        break;
      case '5':
        tmpnewchar = `伍${tmpnewchar}`;
        break;
      case '6':
        tmpnewchar = `陆${tmpnewchar}`;
        break;
      case '7':
        tmpnewchar = `柒${tmpnewchar}`;
        break;
      case '8':
        tmpnewchar = `捌${tmpnewchar}`;
        break;
      case '9':
        tmpnewchar = `玖${tmpnewchar}`;
        break;
      default:
    }
    switch (part[0].length - i - 1) {
      case 0:
        tmpnewchar += '元';
        break;
      case 1:
        if (perchar !== 0) tmpnewchar += '拾';
        break;
      case 2:
        if (perchar !== 0) tmpnewchar += '佰';
        break;
      case 3:
        if (perchar !== 0) tmpnewchar += '仟';
        break;
      case 4:
        tmpnewchar += '万';
        break;
      case 5:
        if (perchar !== 0) tmpnewchar += '拾';
        break;
      case 6:
        if (perchar !== 0) tmpnewchar += '佰';
        break;
      case 7:
        if (perchar !== 0) tmpnewchar += '仟';
        break;
      case 8:
        tmpnewchar += '亿';
        break;
      case 9:
        tmpnewchar += '拾';
        break;
      default:
    }
    newchar = tmpnewchar + newchar;
  }
  // 小数点之后进行转化
  if (num.indexOf('.') !== -1) {
    if (part[1].length > 2) {
      // alert('小数点之后只能保留两位,系统将自动截断')
      part[1] = part[1].substr(0, 2);
    }
    for (let i = 0; i < part[1].length; i++) {
      let tmpnewchar = '';
      const perchar = part[1].charAt(i);
      switch (perchar) {
        case '0':
          tmpnewchar = `零${tmpnewchar}`;
          break;
        case '1':
          tmpnewchar = `壹${tmpnewchar}`;
          break;
        case '2':
          tmpnewchar = `贰${tmpnewchar}`;
          break;
        case '3':
          tmpnewchar = `叁${tmpnewchar}`;
          break;
        case '4':
          tmpnewchar = `肆${tmpnewchar}`;
          break;
        case '5':
          tmpnewchar = `伍${tmpnewchar}`;
          break;
        case '6':
          tmpnewchar = `陆${tmpnewchar}`;
          break;
        case '7':
          tmpnewchar = `柒${tmpnewchar}`;
          break;
        case '8':
          tmpnewchar = `捌${tmpnewchar}`;
          break;
        case '9':
          tmpnewchar = `玖${tmpnewchar}`;
          break;
        default:
      }
      if (i === 0) tmpnewchar += '角';
      if (i === 1) tmpnewchar += '分';
      newchar += tmpnewchar;
    }
  }
  // 替换所有无用汉字
  while (newchar.search('零零') !== -1) {
    newchar = newchar.replace('零零', '零');
  }
  newchar = newchar.replace('零亿', '亿');
  newchar = newchar.replace('亿万', '亿');
  newchar = newchar.replace('零万', '万');
  newchar = newchar.replace('零元', '元');
  newchar = newchar.replace('零角', '');
  newchar = newchar.replace('零分', '');
  if (newchar.charAt(newchar.length - 1) === '元') {
    newchar += '整';
  }
  return newchar;
};

export const getMainRole = roleList => {
  if (!Array.isArray(roleList) || !roleList.length) return '';
  let mainIndex = roleList.findIndex(item => item.roleEmpRel && item.roleEmpRel.isRole === 'y');
  if (mainIndex === -1) mainIndex = 0;
  return roleList[mainIndex];
};

export const isAndroid = () => /android/.test(navigator.userAgent.toLowerCase());

export const isIOS = () => /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());

export const hasOwn = (obj, attr) => Object.prototype.hasOwnProperty.call(obj, attr);

export const getResponse = (response, errorCallback) => {
  const { data } = response || {};
  if (data && data.code !== 200) {
    if (errorCallback) {
      errorCallback(data);
    } else {
      const msg = data.message || data.msg || '操作失败';
      Toast.fail(msg);
    }
  } else {
    return data && hasOwn(data, 'body') ? data.body : data;
  }
};
