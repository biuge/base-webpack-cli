
import React, { createElement } from 'react';
import Loadable from 'react-loadable';

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });
const dynamicWrapper = (app, models, component) => {
  models.forEach((model) => {
    if (modelNotExisted(app, model)) {
      app.model(require(`../models/${model}`).default);
    }
  });
  // () => import('module')
  return Loadable({
    loader: component,
    loading: () => {
      return <div>loading...</div>;
    },
  });
};


export const getRouterData = (app) => {
  const routerConfig = {
    '/basic': {
      name: '框架',
      component: dynamicWrapper(app, ['basic'], () => import('../routes/basic')),
    },
    '/home': {
      name: '首页',
      component: dynamicWrapper(app, [], () => import('../routes/home')),
    },
    '/login': {
      name: '登录',
      component: dynamicWrapper(app, [], () => import('../routes/login')),
    },
  };
  const routerdata = Object.keys(routerConfig).map((data, i) => {
    return (
      {
        path: data,
        component: routerConfig[data].component,
        key: i,
      }
    );
  });
  return routerdata;
}
;
