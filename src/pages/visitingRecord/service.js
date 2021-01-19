import request from 'umi-request';

// 就诊记录
export async function getVisitingRecord(data) {
  return request('/api/mp/visiting/record', {
    method: 'POST',
    data,
  });
}
