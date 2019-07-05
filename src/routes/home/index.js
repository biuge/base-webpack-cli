import React, { Fragment } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';

import styles from './index.css';
import styles2 from './index.less';
import logo from '@/common/hello/images/logo.png';
import Hello from '@/common/hello';

@connect(({ basic }) => ({
  basic,
}))
export default class tableList extends React.Component {
  go = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'basic/goHome',

    });
  }
  render() {
    return (
      <Fragment>
        <div>{
          `${Hello}`
        }</div>
        <div className={styles.a}>basic23</div>
        <img src={logo} className={styles2.a} />
        <img src={require('@/common/hello/images/logo.png')} />
        <Button>12</Button>
        <a onClick={() => { this.go(); }} >gohome</a>
      </Fragment>
    );
  }
}
