import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Button } from 'antd-mobile';
import styles from './index.css';
import styles2 from './index.less';
import logo from '@/common/hello/images/logo.png';
import Hello from '@/common/hello';


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
