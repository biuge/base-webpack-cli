import { routerRedux } from 'dva/router';
import { reducer as formReducer } from 'redux-form';

export default {
  namespace: 'contactFormValues',
  state: {
    firstName: 'chen',
    lastName: 'lei',
    email: '163',
  },


  effects: {
    *goHome(_, { put }) {
      yield put(routerRedux.push('/home'));
    },
  },

};
