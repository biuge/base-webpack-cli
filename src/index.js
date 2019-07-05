
import dva from 'dva';
import { reducer as formReducer } from 'redux-form';
// import createHistory from 'history/createBrowserHistory';
import { createHashHistory } from 'history';


const app = dva({
  history: createHashHistory(),
  extraReducers: {
    form: formReducer,
  },
});
app.router(require('./router').default);

app.start('#root');
// document.getElementById('root').appendChild(Config);
