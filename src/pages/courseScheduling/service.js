import request from 'umi-request';

// 排课信息
export async function getArrangeClassInfo(data) {
  return request('/api/mp/arrange/arrangeClassInfo', {
    method: 'POST',
    data,
  });
}
