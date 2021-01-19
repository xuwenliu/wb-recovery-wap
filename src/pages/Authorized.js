import React, { useEffect } from 'react';
import RenderAuthorized from '@/components/Authorized';
import { getAuthority, logout, getToken } from '@/utils/authority';
import { Route, Redirect } from 'dva/router';
import { getAuthUrl, getUserInfo } from '@/services/api';

import router from 'umi/router';

const Authority = getAuthority();
const Authorized = RenderAuthorized(Authority);

export default props => {
  const { children, location } = props;
  const { query, pathname } = location;
  const token = getToken();

  // http%3A%2F%2F10.180.5.137%3A8001
  // http://10.180.5.137:8001/home/index?code=001C0U0w3flgvV2ESb1w3AL8ze2C0U0B&state=bfe14bbe-ecbf-4cd3-9adb-2ade7c5ae487
  const queryUserInfo = async () => {
    if (query.code) {
      // 通过code去获取用户信息
      const res = await getUserInfo({ code: query.code });
      if (res) {
        localStorage.setItem('openId', res.openId);
        localStorage.setItem('userInfo', JSON.stringify(res));
      }
    }
  };
  useEffect(() => {
    if (!token) {
      queryUserInfo();
    }
  }, []);

  return (
    <Authorized
      authority={children.props.route.authority}
      noMatch={<Redirect to="/exception/403" />}
    >
      <Route
        render={() => {
          if (token) {
            if (token.isNeedBind) {
              return <Redirect to={`/user/login`} />;
            } else {
              return children;
            }
          } else {
            return <Redirect to={`/user/login`} />;
          }
        }}
      />
    </Authorized>
  );
};
