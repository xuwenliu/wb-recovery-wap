import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import withRouter from 'umi/withRouter';
import Authorized from '@/utils/Authorized';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Exception403 from '@/pages/exception/403';
import pathToRegexp from 'path-to-regexp';
import { connect } from 'dva';
import router from 'umi/router';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import selftheme from '@/theme';
import styles from './index.less';
import { getToken } from '../utils/authority';

import '@/layouts/nprogress.less';

NProgress.configure({ showSpinner: false });

/**
 *
 * 設定樣式
 * https://material-ui.com/zh/customization/color/
 * https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=64B5F6&secondary.color=4FC3F7
 */
const theme = createMuiTheme(selftheme);

let currHref = '';

function BasicLayout(props) {
  const getRouterAuthority = (pathname, routeData) => {
    let routeAuthority = ['noAuthority'];
    const getAuthority = (key, routes) => {
      routes.map(route => {
        if (route.path && pathToRegexp(route.path).test(key)) {
          routeAuthority = route.authority;
        } else if (route.routes) {
          routeAuthority = getAuthority(key, route.routes);
        }
        return route;
      });
      return routeAuthority;
    };
    return getAuthority(pathname, routeData);
  };

  const {
    children,
    loading,
    location: { pathname },
    dispatch,
    route: { routes },
  } = props;

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);


  const routerConfig = getRouterAuthority(pathname, routes);
  const { href } = window.location; // 浏览器地址栏中地址
  if (currHref !== href) {
    // currHref 和 href 不一致时说明进行了页面跳转
    NProgress.start(); // 页面开始加载时调用 start 方法
    if (!loading.global) {
      // loading.global 为 false 时表示加载完毕
      NProgress.done(); // 页面请求完毕时调用 done 方法
      currHref = href; // 将新页面的 href 值赋值给 currHref
    }
  }

  return (
    <ReactCSSTransitionGroup
      transitionName="transitionWrapper"
      component="div"
      className={styles.transitionWrapper}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
    >
      <div
        key={pathname}
        style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'auto' }}
      >
        <Authorized authority={routerConfig} noMatch={<Exception403 />}>
          <ThemeProvider theme={theme}>
            {children}

            {/* 底部导航条 */}
          </ThemeProvider>
        </Authorized>
      </div>
    </ReactCSSTransitionGroup>
  );
}

export default withRouter(connect(({ app, loading }) => ({ app, loading }))(BasicLayout));
