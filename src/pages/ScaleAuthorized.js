import React, { useEffect, useState } from 'react';
import RenderAuthorized from '@/components/Authorized';
import { Route, Redirect } from 'dva/router';
// import { parseJwt, isExpired } from 'jwtiny';
import { getScaleToken } from '@/pages/scale/service/thirdparty';

import router from 'umi/router';

/**
 * 先設定一定會由首頁跳轉過來.會有 openid
 */
export default props => {
  const { children, location } = props;
  const { query, pathname } = location;

  const openId = localStorage.getItem('openId');
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token');
  });

  const fetchToken = async () => {
    const res = await getScaleToken();
    if (res) {
      localStorage.setItem('token', res.token);
      setToken(res.token);
    }
  };

  /**
  const tokenIsExpired = () => {
    const jwt = parseJwt(token);
    return isExpired(jwt);
  };
   */

  useEffect(() => {
    // if (!token || tokenIsExpired()) {
    fetchToken();
    // }
  }, []);

  if (!openId) {
    return <Redirect to={`/user/login`} />;
  }

  if (token) {
    return children;
  }

  return null;
};
