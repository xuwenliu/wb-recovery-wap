import { routerRedux } from 'dva/router';
import { fakeAccountLogin, getFakeCaptcha } from './service';
// eslint-disable-next-line no-unused-vars
import { getPageQuery, setAuthority } from './utils/utils';
import { router } from 'umi';

const Model = {
  namespace: 'userLogin',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      // const response = yield call(fakeAccountLogin, payload);

      // if (response) {
      //   const { role = 'admin', token, refreshToken } = response;

      //   console.log('role:', role);

      //   yield put({
      //     type: 'changeLoginStatus',
      //     payload: { currentAuthority: role, token, refreshToken },
      //   });

      //   yield put(routerRedux.replace('/'));
      // }

      const token = yield call(fakeAccountLogin, payload);
      console.log('----',token)
      const response = {};
      if (token) {
        response.status = 'ok';
        response.currentAuthority = 'admin';
        response.type = payload.loginType;
        localStorage.setItem('token', token);
        localStorage.setItem('username', payload.username);
      }

      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      if (response.status === 'ok') {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        router.replace(redirect || '/');
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
export default Model;
