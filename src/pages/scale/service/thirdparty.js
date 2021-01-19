import request from '@/utils/request';

export async function getScaleToken() {
  return request('/api/open/token', {
    method: 'POST',
    params: { secret: 'secret' },
  });
}

export async function getBindingObjet() {
  return request('/api/mp/patient/allPatient');

  /**
  return [
    {
      number: 'DDL30',
      name: '魏泽辰',
      birthday: 1580947200000,
    },
    {
      number: 'DDL31',
      name: '魏XX',
      birthday: 1580967200000,
    },
  ];
   */
}
