import React, { useEffect, useState } from 'react';

import { Result, Icon, Card, WhiteSpace, ActivityIndicator } from 'antd-mobile';
import { useResponsive } from '@umijs/hooks';

function CurrentUser({ loading, object, children }) {
  if (!object || loading) {
    return <ActivityIndicator />;
  }

  if (object && object.birthday) {
    return children;
  }

  return (
    <>
      <Result
        img={
          <Icon type="cross-circle-o" style={{ fill: '#F13642', width: '50px', height: '50px' }} />
        }
        style={{ paddingTop: '100px' }}
        message="请先设定基本资料"
      />
      <WhiteSpace />
    </>
  );
}

export default CurrentUser;
