import request from '@/utils/request';

export async function getCommonAllEnums() {
  return request('/common/allEnumsData');
}
export async function getCommonEnums(params) {
  return request('/common/enums', {
    params: params,
  });
}
export async function getCommonRegion(params) {
  return request('/common/region', {
    params: params,
  });
}
export async function fileUpload(data) {
  const res = await request('/api/mp/file/upload', {
    method: 'POST',
    data,
  });
  const params = {
    fileName: res,
  };
  const url = await request('/api/mp/file/downloadUrl', {
    params,
  });
  return {
    name: res,
    url,
  };
}
