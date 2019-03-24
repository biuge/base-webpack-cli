
import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import { reducer as formReducer } from 'redux-form';

const app = dva({
  history: createHistory(),
  extraReducers: {
    form: formReducer,
  },
});
app.router(require('./router').default);

app.start('#root');
// document.getElementById('root').appendChild(Config);
