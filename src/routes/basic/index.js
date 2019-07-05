import React, { Fragment, PureComponent } from 'react';
import { Route, Redirect, Switch } from 'dva/router';

import { connect } from 'dva';
import { Button } from 'antd';
import styles from './index.css';
import styles2 from './index.less';
import logo from '@/common/hello/images/logo.png';
import Hello from '@/common/hello';
import {getRoutes} from 'utils/utils.js'


@connect(({ basic }) => ({
  basic,
}))
export default class BasicLayout extends PureComponent {
  go = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'basic/goHome',

    });
  }
  render() {
    const {
      currentUser, fetchingNotices, notices, routerData, match, location,
    } = this.props;
    return (
      <Switch>
          {
            getRoutes(match.path, routerData).map(item => (
              <Route
                key={item.key}
                path={item.path}
                component={item.component}
                exact={item.exact}
              />
            ))
          }
        </Switch>  
    );
  }
}
