import React, { createElement } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { getRouterData } from './common/routerConfig';

const { ConnectedRouter } = routerRedux;
const Config = ({ history, app }) => {
  const routerData = getRouterData(app);
  return (
    <ConnectedRouter history={history}>
      <Switch>
        {
          routerData.map(i => <Route {...i} />)
        }
      </Switch>
    </ConnectedRouter>
  );
};
export default Config;
