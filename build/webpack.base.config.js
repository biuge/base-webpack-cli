const path = require('path');
const loader = require('./loader');
const plugin = require('./plugin');

// 基本配置
const webpackConfig = {
  // entry: {},
  cache: true,
  devtool: false,
  // output: {},
  resolve: {
    modules: [
      path.resolve('node_modules'),
    ],
    extensions: ['.js', '.vue', '.jsx', '.css', '.less'],
    alias: {
      '@': path.resolve('src'),
    },
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
    ],
  },
  // 配置插件
  plugins: [
    plugin.define(),
  ],
  externals: {},
  target: 'web',
};

module.exports = webpackConfig;
