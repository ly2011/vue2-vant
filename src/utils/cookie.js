export const setCookie = (name, value, expiredays) => {
  const exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = `${name}=${escape(value)}${expiredays == null ? '' : `;expires=${exdate.toGMTString()}`}`;
};
// 获取cookie
export const getCookie = name => {
  if (document.cookie.length > 0) {
    let start = document.cookie.indexOf(`${name}=`);
    if (start !== -1) {
      start = start + name.length + 1;
      let end = document.cookie.indexOf(';', start);
      if (end === -1) {
        end = document.cookie.length;
      }
      return unescape(document.cookie.substring(start, end));
    }
  }

  return '';
};
// 清除cookie
export const clearCookie = () => {
  const keys = document.cookie.match(/[^ =;]+(?=)/g);
  if (keys) {
    for (let i = keys.length; i--; ) {
      document.cookie = `${keys[i]}=0;expires=${new Date(0).toUTCString()}`;
    }
  }
};
//  删除对应cookie
export const delCookie = name => {
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);
  const cval = getCookie(name);
  if (cval != null) {
    document.cookie = `${name}=${cval};expires=${exp.toGMTString()}`;
  }
};
