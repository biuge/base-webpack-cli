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
    // plugin.hmr(),
    plugin.friendlyErrors(),
  ].concat(new HtmlWebpackPlugin({ template: './index.html' })),
  externals: {},
  devServer: {
    host: '0.0.0.0',
    port: 5000,
    proxy: {
      '/magicCubeApi': {
        target: 'https://statictest.tf56.com',
        changeOrigin: true,
      },
      '/ProxyDHOME': {
        target: 'http://10.7.28.14/',
        changeOrigin: true,
        pathRewrite: { '^/ProxyDHOME': '' },
      },
      '/antColonyCapApi': {
        target: 'https://statictest.tf56.com',
        changeOrigin: true,
      },
      '/antColonyOdsApi': {
        target: 'https://statictest.tf56.com',
        changeOrigin: true,
      },
      '/antColonyScrmApi': {
        target: 'https://statictest.tf56.com',
        changeOrigin: true,
      },
      '/antColonyTmcsApi': {
        target: 'https://statictest.tf56.com',
        changeOrigin: true,
      },
      '/antColonyAcssApi': {
        target: 'https://statictest.tf56.com',
        changeOrigin: true,
      },
      '/antColonyUmsApi': {
        target: 'https://statictest.tf56.com',
        changeOrigin: true,
      },
      '/marketingScoreNode': {
        target: 'https://statictest.tf56.com',
        changeOrigin: true,
      },
      '/magicBoxApi': {
        target: 'https://10.77.0.148/',
        changeOrigin: true,
      },

      '/teamWorkApi': {
        target: 'https://statictest.tf56.com',
        changeOrigin: true,
      },
      '/ehacasApi': {
        target: 'https://sitetest.tf56.com',
        changeOrigin: true,
      },
      '/lujingGisAdmin': {
        target: 'https://10.7.28.14',
        changeOrigin: true,
      },
    },
    historyApiFallback: true,
    hot: false,
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
      poll: 1000,
      ignored: /node_modules/,

    },
    // watch:false
  },
};

module.exports = merge(
  baseWebpackConfig,
  webpackConfig,
);
