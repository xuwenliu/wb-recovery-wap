import request from 'umi-request';

// 上传打卡
export async function saveSign(data) {
  return request('/api/mp/sign/save', {
    method: 'POST',
    data,
  });
}

// 打卡列表
export async function getSignList(data) {
  return request('/api/mp/sign/page', {
    method: 'POST',
    data,
  });
}
