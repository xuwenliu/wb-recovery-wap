// https://umijs.org/config/
import pageRoutes from './router.config';
import theme from '../src/theme';
import webpackPlugin from './plugin.config';

const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
      },
      pwa: {
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
          importWorkboxFrom: 'local',
        },
      },
      title: {
        defaultTitle: '甜鼠健康',
      },
      dll: false,
      hd: false,
      fastClick: false,
      routes: {
        exclude: [],
      },
      hardSource: false,
    },
  ],
];
export default {
  // add for transfer to umi
  // base: '',
  publicPath: '/',
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },
  history: 'browser', // 默认是 browser  #/hash
  plugins,
  //   exportStatic: {},
  // 路由配置
  routes: pageRoutes,
  // Theme for antd-mobile
  // https://mobile.ant.design/docs/react/customize-theme-cn
  theme: {
    'brand-primary': '#83AC36',
    'brand-primary-tap': '#83AC36',
  },
  externals: {},
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  cssnano: {
    mergeRules: false,
  },
  targets: {
    android: 5,
    chrome: 58,
    edge: 13,
    firefox: 45,
    ie: 9,
    ios: 7,
    safari: 10,
  },
  outputPath: './dist',
  hash: false,
  alias: {},
  proxy: {
    '/api/': {
      target: 'http://49.4.25.130:8080',
      changeOrigin: true,
    },
    '/common/': {
      target: 'http://49.4.25.130:8080',
      changeOrigin: true,
    },

    // '/api': {
    //   // target: 'http://ycte.mobile.ts-health.cn',
    //   // target: 'http://12355.cqhcbk.com/',
    //   // target: 'http://127.0.0.1:5001',
    //   //   target: 'http://192.168.10.17:9966',
    //   target: 'http://cr.ts-health.cn/',
    //   // target: 'http://192.168.10.106:5001',
    //   changeOrigin: true, // pathRewrite: { '^/server': '' }, // /server/api/currentUser -> /api/currentUser
    // },
    // '/server/api/': {
    //   changeOrigin: true,
    //   pathRewrite: { '^/server': '' },
    //   target: 'https://preview.pro.ant.design/',
    // },
    // '/wx/api/': {
    //   changeOrigin: true,
    //   pathRewrite: { '^/wx/api': '' },
    //   target: 'https://games.parsec.com.cn/',
    // },
  },
  ignoreMomentLocale: true,
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
};
