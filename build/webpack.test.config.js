const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const plugin = require('./plugin');
const { getPages } = require('./utils');

const baseWebpackConfig = require('./webpack.base.config');

let entry = {};
// const htmlConfigs = [];
// const pages = getPages(path.resolve('src'));
// pages.forEach((page) => {
//   entry[page.id] = page.entry;

//   page.template = path.resolve('index.html');
//   page.filename = `html/${page.id}.html`;
//   page.chunks = [page.id];

//   htmlConfigs.push(page);
// });

// const htmls = htmlConfigs.map(config => plugin.html(config));

entry = './src/index.js';
// 基本配置
const webpackConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  // entry,
  output: {
    publicPath: '/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
  },
  plugins: [
    plugin.hmr(),
    plugin.friendlyErrors(),
  ].concat(new HtmlWebpackPlugin({ template: './index.html' })),
  externals: {},
  devServer: {
    host: '0.0.0.0',
    port: 5000,
    proxy: {},
    historyApiFallback: true,
    hot: true,
    open: false,
    https: false,
    contentBase: false,
    compress: true,
    publicPath: '/',
    quiet: true,
    inline: true,
    // noInfo: true,
    // stats: 'errors-only',
    clientLogLevel: 'warning',
    disableHostCheck: true,
    overlay: true,
    watchOptions: {
      poll: true,
    },
  },
};

module.exports = merge(
  baseWebpackConfig,
  webpackConfig,
);
