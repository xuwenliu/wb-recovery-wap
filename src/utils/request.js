/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { Toast } from 'antd-mobile';
import { router } from 'umi';
import { stringify } from 'qs';
import { getAuthUrl } from '@/services/api.tsx';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */

const errorHandler = error => {
  const { response } = error;

  console.log('error:', error);

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    Toast.info(errorText);
  } else if (!response) {
    Toast.info('网络异常');
  }

  return response;
};
/**
 * 配置request请求时的默认参数
 */

const request = extend({
  errorHandler,
  // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});
request.interceptors.request.use(async (url, options) => {
  if (options.data) {
    if (options.data.current) {
      // 这里统一处理 分页查询参数 后端需要的是 page 和 size 而框架自己的是 current和pageSize
      // 并且后端要求page默认从0开始 所有下边减1
      options.data.page = options.data.current - 1;
      delete options.data.current;
    }
    if (options.data.pageSize) {
      options.data.size = options.data.pageSize;
      delete options.data.pageSize;
    }
  }
  // 如果是delete请求方式 则 在url后面拼接id参数
  const method = options.method.toLocaleLowerCase();
  if (method === 'delete' || method === 'put') {
    if (options.data && options.data.id) {
      url = url + '/' + options.data.id;
    }
  }
  // 请求头添加token
  let token = localStorage.getItem('openId'); // 移动端用 openId作为token

  if (
    url.startsWith('/api/scale/') ||
    url.startsWith('/api/object') ||
    url.startsWith('/api/open/token')
  ) {
    token = localStorage.getItem('token');
  }

  let headers = {};
  if (options.headers) {
    headers = { ...options.headers };
  }
  if (token) {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return {
    url,
    options: {
      ...options,
      headers,
    },
  };
});

request.interceptors.response.use(async (response, options) => {
  let result;

  if (response.status === 204) {
    return;
  }

  const res = await response.clone().json();

  if (res.status === undefined || res.status === 200) {
    result = res.data ? res.data : res;
  } else {
    // 界面报错处理
    Toast.info(res.msg);
    // 401 需要绑定手机号
    if (res.status === 401) {
      router.replace({
        pathname: `/user/login`,
      });
    }
    // 403 公众号未授权
    if (res.status === 403) {
      localStorage.removeItem('openId');
      localStorage.removeItem('userInfo');
      getAuthUrl().then(res => {
        location.href = res;
      });
    }
  }
  return result;
});

export default request;
