import { parse } from 'qs';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}
export function setAuthority(authority, token, refreshToken) {
  // const proAuthority = typeof authority === 'string' ? [authority] : authority;
  // /**
  //  * add token and refreshToken
  //  */
  // localStorage.setItem('token', token);
  // localStorage.setItem('refreshToken', refreshToken);

  // return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority)); // auto reload

}
