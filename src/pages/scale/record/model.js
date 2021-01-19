import { manage } from '../service/compose';
import { getBindingObjet } from '../service/thirdparty';

export default {
  namespace: 'scaleRecord',

  state: {},

  effects: {
    *fetch({ payload }, { call, put }) {
      const objects = yield call(getBindingObjet, payload);

      const userNumbers = [];
      const patientId = localStorage.getItem('patientId');
      
      objects.forEach(obj => {
        if (obj.id === patientId) {
          userNumbers.push(obj.number);
        }
      });

      const object = objects.find(i => i.id === patientId);
      const records = yield call(manage, {
        values: {
          userNumbers,
        },
      });
      yield put({
        type: 'save',
        payload: { object,records },
      });
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
