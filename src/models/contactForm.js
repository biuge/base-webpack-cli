import { routerRedux } from 'dva/router';
import { reducer as formReducer } from 'redux-form';

export default {
  namespace: 'contactForm',
  state: {
    list: [1],
  },


  effects: {
    *goHome(_, { put }) {
      yield put(routerRedux.push('/home'));
    },
  },

};
