import request from '@/utils/request';

export function getThirdparty(thirdparty, code) {
  return request('/api/thirdparty/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: { type: thirdparty, value: code },
  });
}

export function sendSMS(mobile) {
  return request(`/api/sms/${mobile}?check=false`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

export function checkSMS(mobile, code) {
  return request(`/api/sms/${mobile}/check/${code}?check=false`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

export function registThirdparty(phone, values) {
  return request(`/api/thirdparty/${phone}/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });
}
