import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

/**
 * 取得登入者資訊
 */
export async function queryCurrent() {
  return request('/api/account/current');
}
export async function queryNotices() {
  return request('/api/notices');
}
