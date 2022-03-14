// import store from '@/store'

/**
 * 获取用户信息
 */
export function getUserInfo() {
  // const userInfo = store?.state?.user?.user
  return JSON.parse(sessionStorage.getItem('user') || '{}');
}

/**
 * 获取当前用户ssoToken
 */
export function getSSOToken() {
  return getUserInfo()?.ssoToken;
}

/**
 * 获取当前登录用户信息
 * @returns {object}
 */
export function getLoginInfo() {
  // const loginInfo = store?.state?.user?.loginInfo
  return JSON.parse(sessionStorage.getItem('loginInfo') || '{}');
}

/**
 * 获取当前用户所属租户 ID
 */
export function getUserOrganizationId() {
  return getLoginInfo()?.organizationId;
}

/**
 * 获取当前用户token
 */
export function getUserToken() {
  return getLoginInfo()?.accessToken;
}
