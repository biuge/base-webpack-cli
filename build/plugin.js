const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const notifier = require('node-notifier');
const internalIp = require('internal-ip');

const resolve = path.resolve;

const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const VconsolePlugin = require('vconsole-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 这里将 Node 中使用的变量也传入到 Web 环境中，以方便使用
exports.define = () => {
  return new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV === 'development' ? 'development' : 'production'),
    },
  });
};

// 启用HMR
exports.hmr = () => {
  return new webpack.HotModuleReplacementPlugin();
};

// hash 用于编译时未修改内容时 hash不变提高缓存性能  生产用
exports.hash = () => {
  return new webpack.HashedModuleIdsPlugin();
};

// 代码压缩插件
exports.uglify = () => {
  return new UglifyjsWebpackPlugin({
    exclude: /\.min\.js$/, // 排除已经压缩过的 防止再次压缩导致的未知BUG
    cache: true,
    parallel: true,
    sourceMap: false, // 压缩性能可以关注
    extractComments: false,
    uglifyOptions: {
      compress: {
        unused: true,
        warnings: false,
        drop_debugger: true,
      },
      output: {
        comments: false,
      },
    },
  });
};

// Merge chunks
exports.merge = () => {
  return new webpack.optimize.AggressiveMergingPlugin();
};

// 将manifest内联到html中，避免多发一次请求
exports.inlineManifest = () => {
  return new InlineManifestWebpackPlugin();
};

// 优化控制台输出
exports.friendlyErrors = () => {
  const localIP = internalIp.v4.sync();

  return new FriendlyErrorsPlugin({
    compilationSuccessInfo: {
      messages: [
        'Local    ->  http://localhost:5000/',
        `Network  ->  http://${localIP}:5000/`,
      ],
    },
    onErrors: (severity, errors) => {
      console.log(errors);
      if (!config.fle.notify) return;
      if (severity !== 'error') return;

      const error = errors[0];
      const filename = error.file && error.file.split('!').pop();

      notifier.notify({
        title: path.basename(resolve('.')),
        message: `${severity}: ${error.name}`,
        subtitle: filename || '',
        icon: path.join(__dirname, './logo.png'),
      });
    },
  });
};

// 分离css文件
exports.extractCSS = (opt = {}) => {
  return new MiniCssExtractPlugin({
    filename: opt.filename || 'css/[name].[contenthash:8].css',
    chunkFilename: opt.chunkFilename || 'css/[name].[contenthash:8].css',
  });
};

// 优化css打包，避免重复打包
exports.optimizeCSS = () => {
  return new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessorOptions: {
      safe: true,
      autoprefixer: { disable: true },
      mergeLonghand: false,
      discardComments: {
        removeAll: true,
      },
    },
    canPrint: true,
  });
};

// 模块依赖分析
exports.analyzer = (opt = {}) => {
  return new BundleAnalyzerPlugin({
    openAnalyzer: true,
    analyzerMode: 'static', // server, static
    reportFilename: opt.filename || 'report.html',
  });
};

const htmlDefaults = {
  title: 'basewebpack-cli',
  keywords: '',
  description: '基于fle-cli的webpack基本配置 加上less 和antd框架 dva 用于最常规的react开发',
  icon: '',
  css: [],
  prejs: [],
  js: [],
  filename: 'html/404.html',
  template: resolve('index.html'),
  inject: true,
  chunks: [],
  chunksSortMode: 'dependency',
  minify: process.env.NODE_ENV === 'development' ? null : {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true,
  },
};

exports.html = (opt = {}) => {
  return new HtmlWebpackPlugin(Object.assign({}, htmlDefaults, opt));
};
