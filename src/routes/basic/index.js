import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import styles from './index.css';

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
        <div className={styles.a}>basic1</div>
        <a onClick={() => { this.go(); }} >gohome</a>
      </Fragment>
    );
  }
}
