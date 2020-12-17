import router from 'umi/router';
import { reloadAuthorized } from '@/utils/Authorized';
import { setAuthority } from '../utils/utils';
import * as service from './service';

const defaultState = () => ({
  thirdparty: null,
  fields: {},
});

export default {
  namespace: 'oauth2',
  state: defaultState(),
  reducers: {
    init() {
      return defaultState();
    },
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    saveFields(state, { payload: { changeField } }) {
      // eslint-disable-next-line compat/compat
      const fields = Object.assign({}, state.fields, changeField);
      return { ...state, fields };
    },
  },
  effects: {
    *getThirdparty({ payload: { code, thirdparty, query } }, { call }) {
      const data = yield call(service.getThirdparty, thirdparty, code);
      console.log('=======公众号授权========');
      if (data.token) {
        setAuthority(data.role, data.token, data.refreshToken);
        reloadAuthorized();
        router.push({ pathname: query.next || '/' });
      }
    },
  },
  subscriptions: {
    // eslint-disable-next-line no-unused-vars
    setup({ dispatch, history }) {
      // eslint-disable-next-line no-unused-vars
      return history.listen(({ pathname, query, state }) => {});
    },
  },
};
