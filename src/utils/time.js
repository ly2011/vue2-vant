import dayjs from 'dayjs';

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

const transferDate = date => {
  if (date && typeof date === 'string') {
    if (date.includes('-') || date.includes('/')) {
      return date.replace(/-/g, '/');
    }
    return parseFloat(date);
  }
  return date;
};

export const isDate = (date, format) => {
  if (!date) return false;
  date = transferDate(date);
  if (Number.isNaN(+new Date(date))) return false;
  const tempDate = dayjs.isDayjs(date) ? date : dayjs(date);
  const parsed = dayjs(tempDate, format, !!format);
  return parsed.isValid();
};

/**
 * 格式化时间
 * @param {Number|String|Date} value 日期
 * @param {String} format 时间格式
 */
export const formatDate = (value, format = 'YYYY-MM-DD') => {
  let tempFormat = format;
  if (!value) return '';
  if (!isDate(value)) return '';
  value = transferDate(value);
  // eslint-disable-next-line prefer-destructuring
  if (Array.isArray(format)) tempFormat = format[0];
  const tempDate = dayjs.isDayjs(value) ? value : dayjs(value);
  return tempDate.format(tempFormat);
};

/**
 * 格式化日期时间
 * @param {Number, String, Date} value 日期
 * @param {String} format
 */
export const formatDateTime = (value, format = 'YYYY-MM-DD HH:mm:ss') => formatDate(value, format);

/**
 * 格式化为时间戳
 * @param {Number|String|Date} value 日期
 */
export const parseDate = value => {
  if (!value) return null;
  if (!isDate(value)) return null;
  value = transferDate(value);
  const tempDate = dayjs.isDayjs(value) ? value : dayjs(value);
  return tempDate.valueOf();
};

/**
 * 格式化为dayjs格式
 * @param {Number|String|Date} value 日期
 */
export const toDayjs = value => {
  if (!value) return undefined;
  if (!isDate(value)) return undefined;
  value = transferDate(value);
  const tempDate = dayjs.isDayjs(value) ? value : dayjs(value);
  return tempDate;
};

export default dayjs;
