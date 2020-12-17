import request from 'umi-request';

// 家长关联的患者列表
export async function getParentAllPatient() {
  return request('/api/mp/patient/allPatient');
}
