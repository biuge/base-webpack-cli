
import dva from 'dva';
import createHistory from 'history/createBrowserHistory';


const app = dva({
  history: createHistory(),
});
app.router(require('./router').default);

app.start('#root');
// document.getElementById('root').appendChild(Config);
