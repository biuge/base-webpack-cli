import { routerRedux } from 'dva/router';

export default {
  namespace: 'basic',

  state: {
    list: [],
  },


  effects: {
    *goHome(_, { put }) {
      yield put(routerRedux.push('/home'));
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
