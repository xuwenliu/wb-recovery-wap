import request from 'umi-request';

// 家长关联的患者列表
export async function getParentAllPatient() {
  return request('/api/mp/patient/allPatient');
}

// 当前目标
export async function getTargetToday(params) {
  return request('/api/mp/target/today', {
    params,
  });
}

// 历史目标
export async function getTargetHistory(params) {
  return request('/api/mp/target/history', {
    params,
  });
}
// 长期目标
export async function getLongTimeTarget(params) {
  return request('/api/mp/target/longTimeTarget', {
    params,
  });
}

// 轮播图
export async function getCarouselList() {
  return request('/common/allCarouse');
}

// 体格检查曲线图
export async function getGraphData(params) {
  return request('/api/mp/patient/graphData', {
    params,
  });
}
