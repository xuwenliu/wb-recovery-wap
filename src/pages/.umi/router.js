import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import _dvaDynamic from 'dva/dynamic';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/user',
    redirect: '/user/login',
    exact: true,
    _title: '甜鼠健康',
    _title_default: '甜鼠健康',
  },
  {
    path: '/home',
    redirect: '/home/index',
    exact: true,
    _title: '甜鼠健康',
    _title_default: '甜鼠健康',
  },
  {
    path: '/info',
    redirect: '/info/index',
    exact: true,
    _title: '甜鼠健康',
    _title_default: '甜鼠健康',
  },
  {
    path: '/',
    Routes: [require('../Authorized').default],
    redirect: '/home/index',
    exact: true,
    _title: '甜鼠健康',
    _title_default: '甜鼠健康',
  },
  {
    path: '/user',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__UserLayout" */ '../../layouts/UserLayout'),
          LoadingComponent: require('/Users/xwl/Desktop/order/cr-mobile/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/UserLayout').default,
    routes: [
      {
        path: '/user/login',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__User__mobileLogin__model.js' */ '/Users/xwl/Desktop/order/cr-mobile/src/pages/User/mobileLogin/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
                import(/* webpackChunkName: 'p__User__model.js' */ '/Users/xwl/Desktop/order/cr-mobile/src/pages/User/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__User__mobileLogin__components__RegisterComponent" */ '../User/mobileLogin/components/RegisterComponent'),
              LoadingComponent: require('/Users/xwl/Desktop/order/cr-mobile/src/components/PageLoading/index')
                .default,
            })
          : require('../User/mobileLogin/components/RegisterComponent').default,
        exact: true,
        _title: '甜鼠健康',
        _title_default: '甜鼠健康',
      },
      {
        component: () =>
          React.createElement(
            require('/Users/xwl/Desktop/order/cr-mobile/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
        _title: '甜鼠健康',
        _title_default: '甜鼠健康',
      },
    ],
    _title: '甜鼠健康',
    _title_default: '甜鼠健康',
  },
  {
    path: '/login/oauth2',
    component: __IS_BROWSER
      ? _dvaDynamic({
          app: require('@tmp/dva').getApp(),
          models: () => [
            import(/* webpackChunkName: 'p__User__mobileLogin__model.js' */ '/Users/xwl/Desktop/order/cr-mobile/src/pages/User/mobileLogin/model.js').then(
              m => {
                return { namespace: 'model', ...m.default };
              },
            ),
            import(/* webpackChunkName: 'p__User__model.js' */ '/Users/xwl/Desktop/order/cr-mobile/src/pages/User/model.js').then(
              m => {
                return { namespace: 'model', ...m.default };
              },
            ),
          ],
          component: () =>
            import(/* webpackChunkName: "p__User__mobileLogin__oauth2" */ '../User/mobileLogin/oauth2'),
          LoadingComponent: require('/Users/xwl/Desktop/order/cr-mobile/src/components/PageLoading/index')
            .default,
        })
      : require('../User/mobileLogin/oauth2').default,
    hideInMenu: true,
    exact: true,
    _title: '甜鼠健康',
    _title_default: '甜鼠健康',
  },
  {
    path: '/home',
    Routes: [require('../Authorized').default],
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout'),
          LoadingComponent: require('/Users/xwl/Desktop/order/cr-mobile/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/BasicLayout').default,
    routes: [
      {
        path: '/home/index',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__home__index" */ '../home/index'),
              LoadingComponent: require('/Users/xwl/Desktop/order/cr-mobile/src/components/PageLoading/index')
                .default,
            })
          : require('../home/index').default,
        title: '首页',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '首页',
        _title_default: '甜鼠健康',
      },
      {
        path: '/home/target',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__target__index" */ '../target/index'),
              LoadingComponent: require('/Users/xwl/Desktop/order/cr-mobile/src/components/PageLoading/index')
                .default,
            })
          : require('../target/index').default,
        title: '查看目标',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '查看目标',
        _title_default: '甜鼠健康',
      },
      {
        path: '/home/video',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__video__index" */ '../video/index'),
              LoadingComponent: require('/Users/xwl/Desktop/order/cr-mobile/src/components/PageLoading/index')
                .default,
            })
          : require('../video/index').default,
        title: '视频播放',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '视频播放',
        _title_default: '甜鼠健康',
      },
      {
        path: '/home/courseScheduling',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__courseScheduling__index" */ '../courseScheduling/index'),
              LoadingComponent: require('/Users/xwl/Desktop/order/cr-mobile/src/components/PageLoading/index')
                .default,
            })
          : require('../courseScheduling/index').default,
        title: '查看排课',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '查看排课',
        _title_default: '甜鼠健康',
      },
      {
        component: () =>
          React.createElement(
            require('/Users/xwl/Desktop/order/cr-mobile/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
        _title: '甜鼠健康',
        _title_default: '甜鼠健康',
      },
    ],
    _title: '甜鼠健康',
    _title_default: '甜鼠健康',
  },
  {
    path: '/info',
    Routes: [require('../Authorized').default],
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout'),
          LoadingComponent: require('/Users/xwl/Desktop/order/cr-mobile/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/BasicLayout').default,
    routes: [
      {
        path: '/info/index',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__info__index" */ '../info/index'),
              LoadingComponent: require('/Users/xwl/Desktop/order/cr-mobile/src/components/PageLoading/index')
                .default,
            })
          : require('../info/index').default,
        title: '基本信息',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '基本信息',
        _title_default: '甜鼠健康',
      },
      {
        path: '/info/personalInfo',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__info__personalInfo__index" */ '../info/personalInfo/index'),
              LoadingComponent: require('/Users/xwl/Desktop/order/cr-mobile/src/components/PageLoading/index')
                .default,
            })
          : require('../info/personalInfo/index').default,
        title: '个人信息',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '个人信息',
        _title_default: '甜鼠健康',
      },
      {
        path: '/info/personalHistory',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__info__personalHistory__index" */ '../info/personalHistory/index'),
              LoadingComponent: require('/Users/xwl/Desktop/order/cr-mobile/src/components/PageLoading/index')
                .default,
            })
          : require('../info/personalHistory/index').default,
        title: '个人史',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '个人史',
        _title_default: '甜鼠健康',
      },
      {
        path: '/info/pastHistory',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__info__pastHistory__index" */ '../info/pastHistory/index'),
              LoadingComponent: require('/Users/xwl/Desktop/order/cr-mobile/src/components/PageLoading/index')
                .default,
            })
          : require('../info/pastHistory/index').default,
        title: '既往史',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '既往史',
        _title_default: '甜鼠健康',
      },
      {
        path: '/info/familyEnv',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__info__familyEnv__index" */ '../info/familyEnv/index'),
              LoadingComponent: require('/Users/xwl/Desktop/order/cr-mobile/src/components/PageLoading/index')
                .default,
            })
          : require('../info/familyEnv/index').default,
        title: '成长环境',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '成长环境',
        _title_default: '甜鼠健康',
      },
      {
        path: '/info/familyMember',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__info__familyMember__index" */ '../info/familyMember/index'),
              LoadingComponent: require('/Users/xwl/Desktop/order/cr-mobile/src/components/PageLoading/index')
                .default,
            })
          : require('../info/familyMember/index').default,
        title: '家庭成员',
        exact: true,
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '家庭成员',
        _title_default: '甜鼠健康',
      },
      {
        component: () =>
          React.createElement(
            require('/Users/xwl/Desktop/order/cr-mobile/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
        _title: '甜鼠健康',
        _title_default: '甜鼠健康',
      },
    ],
    _title: '甜鼠健康',
    _title_default: '甜鼠健康',
  },
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout'),
          LoadingComponent: require('/Users/xwl/Desktop/order/cr-mobile/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/BasicLayout').default,
    authority: ['user', 'admin'],
    routes: [
      {
        title: 'exception',
        path: '/exception',
        routes: [
          {
            path: '/exception/403',
            title: 'not-permission',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "layouts__BasicLayout" */ '../exception/403'),
                  LoadingComponent: require('/Users/xwl/Desktop/order/cr-mobile/src/components/PageLoading/index')
                    .default,
                })
              : require('../exception/403').default,
            exact: true,
            Routes: [require('./TitleWrapper.jsx').default],
            _title: 'exception - not-permission',
            _title_default: '甜鼠健康',
          },
          {
            path: '/exception/404',
            title: 'not-find',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "layouts__BasicLayout" */ '../exception/404'),
                  LoadingComponent: require('/Users/xwl/Desktop/order/cr-mobile/src/components/PageLoading/index')
                    .default,
                })
              : require('../exception/404').default,
            exact: true,
            Routes: [require('./TitleWrapper.jsx').default],
            _title: 'exception - not-find',
            _title_default: '甜鼠健康',
          },
          {
            path: '/exception/500',
            title: 'server-error',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "layouts__BasicLayout" */ '../exception/500'),
                  LoadingComponent: require('/Users/xwl/Desktop/order/cr-mobile/src/components/PageLoading/index')
                    .default,
                })
              : require('../exception/500').default,
            exact: true,
            Routes: [require('./TitleWrapper.jsx').default],
            _title: 'exception - server-error',
            _title_default: '甜鼠健康',
          },
          {
            component: () =>
              React.createElement(
                require('/Users/xwl/Desktop/order/cr-mobile/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
            _title: '甜鼠健康',
            _title_default: '甜鼠健康',
          },
        ],
        _title: 'exception',
        _title_default: '甜鼠健康',
      },
      {
        path: '/404',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ '../404'),
              LoadingComponent: require('/Users/xwl/Desktop/order/cr-mobile/src/components/PageLoading/index')
                .default,
            })
          : require('../404').default,
        exact: true,
        _title: '甜鼠健康',
        _title_default: '甜鼠健康',
      },
      {
        component: () =>
          React.createElement(
            require('/Users/xwl/Desktop/order/cr-mobile/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
        _title: '甜鼠健康',
        _title_default: '甜鼠健康',
      },
    ],
    _title: '甜鼠健康',
    _title_default: '甜鼠健康',
  },
  {
    component: () =>
      React.createElement(
        require('/Users/xwl/Desktop/order/cr-mobile/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
    _title: '甜鼠健康',
    _title_default: '甜鼠健康',
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return <Router history={history}>{renderRoutes(routes, props)}</Router>;
  }
}
