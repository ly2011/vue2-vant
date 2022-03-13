/* eslint-disable no-useless-escape, max-len */
/**
 * 验证是否是有效的URL路径
 * @param {String} url
 * @returns {Boolean}
 */
export function isURL(url) {
  // eslint-disable-next-line no-useless-escape, max-len
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}

/**
 * 验证是否是有效的邮箱
 * @param {String} email
 * @returns {Boolean}
 */
export function isEmail(email) {
  // eslint-disable-next-line no-useless-escape, max-len
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}

/**
 * 验证是否是字符串
 * @param {String} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true;
  }
  return false;
}

/**
 * 验证是否是数组
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]';
  }
  return Array.isArray(arg);
}

/**
 * 验证是否是统一社会信用代码
 * @param {String} str
 * @returns {Boolean}
 */
export function isUniformSocialCreditCode(str) {
  const reg = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/;
  return reg.test(str);
}

/**
 * 验证是否是银行卡号
 * @param {String} str
 * @returns {Boolean}
 */
export function isBankCardNumber(str) {
  const reg = /^[1-9]\d{9,29}$/;
  return reg.test(str);
}

/**
 * 验证是否是手机号码
 * @param {String} str
 * @returns {Boolean}
 */
export function isMobile(str) {
  // const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
  // return reg.test(str)
  const reg = /^\d{11}$/;
  return reg.test(str);
}
/**
 * 验证是否是电话(座机)
 * @param {String} str
 * @returns {Boolean}
 */
export function isTelephone(str) {
  const reg = /^0\d{2,3}-\d{7,8}$/;
  return reg.test(str);
}

/**
 * 验证是否是身份证号
 * @param {String} str
 * @returns {Boolean}
 */
export function isIDCard(str) {
  const reg =
    /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/;
  return reg.test(str);
}

/**
 * 验证是否是邮政编码
 * @param {String} str
 * @returns {Boolean}
 */
export function isPostalCode(str) {
  const reg = /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/;
  return reg.test(str);
}

/**
 * 验证金额格式是否正确(请输入非负整数或者保留小数点后两位小数)
 * @param {Number} value
 */
export function validMoney(value) {
  if (!value) return true;
  const reg = /^[0-9]+([.]{1}[0-9]{1,2})?$/;
  return reg.test(value);
}

export function validateMobile(value) {
  if (!value) return true;
  return isMobile(value);
}

export function validateTelephone(value) {
  if (!value) return true;
  return isTelephone(value);
}

/**
 * 校验组织机构代码
 * @param {String} value
 */
export const validateOrgCode = value => {
  if (!value) return true;
  return value.length === 9;
};

/**
 * 统一社会信用代码
 * @param {String} value
 */
export const validateUscCode = value => {
  if (!value) return true;
  return value.length === 18;
};
