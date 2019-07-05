import React, { createElement } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { getRouterData } from './common/routerConfig';

const { ConnectedRouter } = routerRedux;
const Config = ({ history, app }) => {
  const routerData = getRouterData(app);
  const BasicLayout = routerData['/'].component;
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" render={props => <BasicLayout {...props} />} />
      </Switch>
    </ConnectedRouter>
  );
};
export default Config;
