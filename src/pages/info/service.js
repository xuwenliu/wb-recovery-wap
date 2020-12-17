import request from 'umi-request';

// 家长端基本资料所有栏位
export async function getParentSectionAll(params) {
  return request('/api/mp/section/parentSection/all', {
    params,
  });
}

// 所有疫苗
export async function getAllVaccine() {
  return request('/api/mp/birthDanger/allVaccine');
}

// 高危因素
export async function getAllBirthDangerInfo() {
  return request('/api/mp/birthDanger/allDanger');
}

//所有传染病
export async function getAllInfection() {
  return request('/api/mp/birthDanger/allInfection');
}

// 所有接触史
export async function getAllTouching() {
  return request('/api/mp/birthDanger/allTouching');
}

// 所有妊娠期疾病情况（来自医学检查高危因素）
export async function getPregnancyInfo() {
  return request('/api/mp/birthDanger/pregnancyInfo');
}

// 患者主体信息保存
export async function saveSubject(data) {
  return request('/api/mp/patient/saveSubject', {
    method: 'POST',
    data,
  });
}
// 患者主体信息获取
export async function getPatientSubjectInfo(params) {
  return request('/api/mp/patient/subjectInfo', {
    params,
  });
}

// 患者基本信息保存
export async function saveBasicInfo(data) {
  return request('/api/mp/patient/saveBasicInfo', {
    method: 'POST',
    data,
  });
}
// 患者基本信息查询
export async function getPatientBasicInfo(params) {
  return request('/api/mp/patient/basicInfo', {
    params,
  });
}

// 患者个人史保存
export async function savePersonHistory(data) {
  return request('/api/mp/patient/savePersonHistory', {
    method: 'POST',
    data,
  });
}
// 患者个人史查询
export async function getPatientPersonHistoryInfo(params) {
  return request('/api/mp/patient/personHistoryInfo', {
    params,
  });
}

// 患者既往史保存
export async function savePatientPastHistory(data) {
  return request('/api/mp/patient/savePatientPastHistory', {
    method: 'POST',
    data,
  });
}
// 患者既往史查询
export async function getPatientPatientPastHistoryInfo(params) {
  return request('/api/mp/patient/patientPastHistoryInfo', {
    params,
  });
}

// 患者家庭成员查询
export async function getAllFamilyMember(params) {
  return request('/api/mp/patient/allFamilyMember', {
    params,
  });
}
// 患者家庭成员添加
export async function addFamilyMemberInfo(data) {
  return request('/api/mp/patient/addFamilyMemberInfo', {
    method: 'POST',
    data,
  });
}
// 患者家庭成员删除
export async function delFamilyMemberInfo(params) {
  return request('/api/mp/patient/delFamilyMemberInfo', {
    method: 'DELETE',
    params,
  });
}

// 树形结构职业栏位
export async function getProfessionTree(params) {
  return request('/api/mp/section/professionTree', {
    params,
  });
}

// 患者成长环境保存
export async function savePatientGrowInfo(data) {
  return request('/api/mp/patient/savePatientGrowInfo', {
    method: 'POST',
    data,
  });
}
// 患者成长环境查询
export async function getPatientGrowInfo(params) {
  return request('/api/mp/patient/mpPatientGrowInfo', {
    params,
  });
}
