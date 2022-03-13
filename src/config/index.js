export const { environment } = process.env;

export const userTest = {
  // 模拟获取的用户uid
  uid: 'win',
  // 模拟token，在这里写入
  ssoToken: 'TV54494970407329792',
};

export const statusBarColor = [255, 255, 255, 1]; // 状态栏颜色
export const language = 'CN'; // 状态栏颜色 'CN,EN'

// 不合法的请求Code
export const invalidRequestCode = [1003, 188888, 100002];

export const baseUrl = {
  // 开发环境
  local: 'https://api.com',
  // 生产环境
  prod: 'https://api.com',
  // 测试环境
  sit: 'https://api.com',
  uat: 'https://api.com',
};

export const baseFileUrl = {
  local: 'https://api.com',
  prod: 'https://api.com',
  // 测试环境
  sit: 'https://api.com',
  uat: 'https://api.com',
};

// 附件预览中转地址
export const masUrl = {
  // 开发环境
  local: 'https://api.com',
  // 生产环境
  prod: 'https://api.com',
  // 测试环境
  sit: 'https://api.com',
  uat: 'https://api.com',
};

// 附件预览地址
export const attachmentInfoUrl = `${masUrl[environment]}`;
