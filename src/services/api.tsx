// @ts-ignore
import request from '@/utils/request';
import { stringify } from 'qs';

export async function query(params) {
  return request(`/api/chapter?${stringify(params)}`);
}

// 获取授权地址,使用微信开发者工具跳转此地址可在地址中获取授权码
export async function getAuthUrl() {
  return request('/api/open/authUrl');
}

// 用户绑定手机号，绑定手机号验证码发送与登录发送验证码不同
export async function bindMobile(data) {
  return request('/api/open/bindMobile', {
    method: 'POST',
    data,
  });
}

// 获取用户信息,同时返回是否已绑定手机号
export async function getUserInfo(params) {
  return request('/api/open/userInfo', {
    method: 'POST',
    params,
  });
}

// 发短信
export async function sendSms(params) {
  return request('/common/bindMobile', {
    params,
  });
}

// 获取服务端保存的用户信息
export async function getServiceUserInfo() {
  return request('/api/mp/user/info');
}

//扫码完成后调用
export async function scanSync(data) {
  return request('/api/mp/scan/sync', {
    method: 'POST',
    data,
  });
}
