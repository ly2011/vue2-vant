import request from '@/utils/request';

const BASE_API = '/api';
// 获取已授权角色列表
export async function getUserInfo() {
  return request.get(`${BASE_API}/getUserInfo`);
}
