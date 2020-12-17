import { parse } from 'qs';
import { logout } from '@/utils/authority';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    // *logout(_, { put }) {
    //   const { redirect } = getPageQuery(); // redirect

    //   if (window.location.pathname !== '/user/login' && !redirect) {
    //     yield put(
    //       routerRedux.replace({
    //         pathname: '/user/login',
    //         search: stringify({
    //           redirect: window.location.href,
    //         }),
    //       }),
    //     );
    //   }
    // },
    // eslint-disable-next-line require-yield
    *logout({ callback }, { put }) {
      if (callback) {
        callback();
        logout();
        yield put({
          type: 'user/saveCurrentUser',
          payload: {},
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
