import developConfig from './defaultSettings';

export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      // { path: '/user/login', component: './User/Login' },
      { path: '/user/login', component: './User/mobileLogin/components/RegisterComponent' },
    ],
  },
  {
    path: '/login/oauth2',
    component: './User/mobileLogin/oauth2',
    hideInMenu: true,
  },

  {
    path: '/',
    Routes: ['src/pages/Authorized'],
    redirect: '/home/index',
  },
  {
    path: '/home',
    Routes: ['src/pages/Authorized'],
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/home',
        redirect: '/home/index',
      },
      {
        path: '/home/index',
        component: './home/index',
        title: '首页',
      },
      {
        path: '/home/target',
        component: './target/index',
        title: '查看目标',
      },
      {
        path: '/home/punchCard',
        component: './punchCard/index',
        title: '训练打卡',
      },
      {
        path: '/home/punchCard/list',
        component: './punchCard/list/index',
        title: '打卡记录',
      },
      {
        path: '/home/video',
        component: './video/index',
        title: '视频播放',
      },
      {
        path: '/home/courseScheduling',
        component: './courseScheduling/index',
        title: '查看排课',
      },
      {
        path: '/home/visitingRecord',
        component: './visitingRecord/index',
        title: '就诊记录',
      },
      {
        path: '/home/chart',
        component: './chart/index',
        title: '体格检查曲线图',
      },
    ],
  },
  {
    path: '/info',
    Routes: ['src/pages/Authorized'],
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/info',
        redirect: '/info/index',
      },
      {
        path: '/info/index',
        component: './info/index',
        title: '基本信息',
      },
      {
        path: '/info/personalInfo',
        component: './info/personalInfo/index',
        title: '个人信息',
      },
      {
        path: '/info/personalHistory',
        component: './info/personalHistory/index',
        title: '个人史',
      },
      {
        path: '/info/pastHistory',
        component: './info/pastHistory/index',
        title: '既往史',
      },
      {
        path: '/info/familyEnv',
        component: './info/familyEnv/index',
        title: '成长环境',
      },
      {
        path: '/info/familyMember',
        component: './info/familyMember/index',
        title: '家庭成员',
      },
    ],
  },
  // scale start
  {
    path: '/scale',
    Routes: ['src/pages/ScaleAuthorized'],
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/scale',
        redirect: '/scale/quick',
      },
      {
        path: '/scale/quick',
        component: './scale/quick',
      },
      {
        path: '/scale/record',
        component: './scale/record',
      },
      {
        path: '/scale/compose/answer',
        component: './scale/compose/answer',
      },
      {
        path: '/scale/compose/answer/single',
        component: './scale/compose/answer/single',
      },
      {
        path: '/scale/compose/report',
        component: './scale/compose/report',
      },
    ],
  },
  // scale end
  {
    path: '/',
    component: '../layouts/BasicLayout',
    // Routes: ['src/pages/Authorized'],
    authority: ['user', 'admin'],
    routes: [
      {
        title: 'exception',
        path: '/exception',
        routes: [
          // Exception
          {
            path: '/exception/403',
            title: 'not-permission',
            component: './exception/403',
          },
          {
            path: '/exception/404',
            title: 'not-find',
            component: './exception/404',
          },
          {
            path: '/exception/500',
            title: 'server-error',
            component: './exception/500',
          },
        ],
      },
      { path: '/404', component: '404' },
    ],
  },
];
