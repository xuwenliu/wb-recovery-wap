import request from '@/utils/request';

export async function getFakeCaptcha(mobile) {
  return request(`/api/sms/${mobile}/login`, {
    method: 'POST',
  });
}

/**
 * 帳號密碼登入
 * @param {*} param0
 */
export async function fakeAccountLogin(params) {
  return request('/api/login', {
    method: 'POST',
    params: params,
  });
}
