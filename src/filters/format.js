import { formatDate as formatDateFunc, formatDateTime as formatDateTimeFunc } from 'utils/time';

export const formatDate = formatDateFunc;

export const formatDateTime = formatDateTimeFunc;

/**
 * 格式化时间
 * @param {Number, String, Date} value
 * @param {String} format
 */
export const formatTime = (value, format = 'HH:mm:ss') => formatDate(value, format);

/**
 * 格式化月份
 * @param {Number, String, Date} value
 * @param {String} format
 */
export const formatMonth = (value, format = 'YYYY-MM') => formatDate(value, format);

/**
 * 千分符格式化金额
 * @param {Number} val
 */
export const thousandthSign = val =>
  val !== null && val !== undefined && typeof val === 'number'
    ? val.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    : val;
