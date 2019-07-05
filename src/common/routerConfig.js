
import React, { createElement } from 'react';
import Loadable from 'react-loadable';
import dynamic from 'dva/dynamic';


// const modelNotExisted = (app, model) =>
//   // eslint-disable-next-line
//   !app._models.some(({ namespace }) => {
//     return namespace === model.substring(model.lastIndexOf('/') + 1);
//   });
// const dynamicWrapper = (app, models, component) => {
//   models.forEach((model) => {
//     if (modelNotExisted(app, model)) {
//       app.model(require(`../models/${model}`).default);
//     }
//   });
//   // () => import('module')
//   return Loadable({
//     loader: component,
//     loading: ({ error, pastDelay }) => {
//       if (error) {
//         console.dir(error);
//         return <div>error</div>;
//       } else if (pastDelay) {
//         return <div>Loading...</div>;
//       } else {
//         return null;
//       }
//     },
//   });
// };

const dynamicWrapper = (app, models, component) => dynamic({
  app,
  // eslint-disable-next-line no-underscore-dangle
  models: () => models.filter(m => !app._models.some(({ namespace }) => namespace === m)).map(m => import(`../models/${m}.js`)),
  // add routerData prop
  component: () => {
    const routerData = getRouterData(app);
    return component().then((raw) => {
      const Component = raw.default || raw;
      return props => <Component {...props} routerData={routerData} />;
    });
  },
});


export const getRouterData = (app) => {
  const routerData = {
    '/': {
      name: '框架',
      component: dynamicWrapper(app, ['basic'], () => import('../routes/basic')),
    },
    '/home': {
      name: '首页',
      component: dynamicWrapper(app, [], () => import('../routes/home')),
    },
    '/antd': {
      name: '登录',
      component: dynamicWrapper(app, [], () => import('../routes/form/antd')),
    },
    '/form': {
      name: '登录',
      component: dynamicWrapper(app, ['contactForm'], () => import('../routes/form')),
    },

  };
  // const routerdata = Object.keys(routerConfig).map((data, i) => {
  //   return (
  //     {
  //       path: data,
  //       component: routerConfig[data].component,
  //       key: i,
  //     }
  //   );
  // });
  // return routerdata;

  const routerDataWithName = {};
  Object.keys(routerData).forEach((item) => {
    routerDataWithName[item] = {
      ...routerData[item],
      name: routerData[item].name,
    };
  });
  return routerDataWithName;
}
;
