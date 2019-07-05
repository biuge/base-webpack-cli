const path = require('path');
const loader = require('./loader');
const plugin = require('./plugin');
const aliasConfig = require('../aliasrc.js');

// 基本配置
const webpackConfig = {
  // entry: {},
  cache: true,
  devtool: false,
  // output: {},
  resolve: {
    // modules: [
    //   path.resolve('node_modules'), //如果写成node_modules会导致dva的一个版本错误 找不到babel-runtime https://github.com/dvajs/dva/issues/1893
    // ],
    extensions: ['.js', '.vue', '.jsx', '.css', '.less'],
    alias: aliasConfig,
  },
  resolveLoader: {
    modules: [
      path.resolve('node_modules'),
    ],
  },
  module: {
    rules: [
      // loader.eslint(),
      loader.css(),
      loader.less(),
      loader.lessModules(),
      loader.cssModules(),
      loader.babel(),
      loader.text(),
      loader.images(),
      loader.fonts(),
      loader.medias(),
      loader.xlsx(),
    ],
  },
  // 配置插件
  plugins: [
    plugin.define(),
    plugin.happyPack(),
  ],
  externals: {
  },
  target: 'web',
};

module.exports = webpackConfig;
