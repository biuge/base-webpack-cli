let fs = require('fs')
let path = require('path')
let webpack = require('webpack')
let notifier = require('node-notifier')
let internalIp = require('internal-ip')

let resolve = path.resolve

let InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
let VconsolePlugin = require('vconsole-webpack-plugin')
let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
let UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// 这里将 Node 中使用的变量也传入到 Web 环境中，以方便使用
exports.define = () => {
  return new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV === 'development' ? 'development' : 'production')
    }
  })
}

// 启用HMR
exports.hmr = () => {
  return new webpack.HotModuleReplacementPlugin()
}

// hash 用于编译时未修改内容时 hash不变提高缓存性能  生产用
exports.hash = () => {
  return new webpack.HashedModuleIdsPlugin()
}

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
        drop_debugger: true
      },
      output: {
        comments: false
      }
    }
  })
}

// Merge chunks
exports.merge = () => {
  return new webpack.optimize.AggressiveMergingPlugin()
}

// 将manifest内联到html中，避免多发一次请求
exports.inlineManifest = () => {
  return new InlineManifestWebpackPlugin()
}

// 优化控制台输出
exports.friendlyErrors = () => {
  let localIP = internalIp.v4.sync()

  return new FriendlyErrorsPlugin({
    compilationSuccessInfo: {
      messages: [
        `Local    ->  http://localhost:5000/`,
        `Network  ->  http://${localIP}:5000/`
      ]
    },
    onErrors: (severity, errors) => {
      if (!config.fle.notify) return
      if (severity !== 'error') return

      let error = errors[0]
      let filename = error.file && error.file.split('!').pop()

      notifier.notify({
        title: path.basename(resolve('.')),
        message: severity + ': ' + error.name,
        subtitle: filename || '',
        icon: path.join(__dirname, './logo.png')
      })
    }
  })
}

// 分离css文件
exports.extractCSS = (opt = {}) => {
  return new MiniCssExtractPlugin({
    filename: opt.filename || 'css/[name].[contenthash:8].css',
    chunkFilename: opt.chunkFilename || 'css/[name].[contenthash:8].css'
  })
}

// 优化css打包，避免重复打包
exports.optimizeCSS = () => {
  return new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessorOptions: {
      safe: true,
      autoprefixer: { disable: true },
      mergeLonghand: false,
      discardComments: {
        removeAll: true
      }
    },
    canPrint: true
  })
}

// 模块依赖分析
exports.analyzer = (opt = {}) => {
  return new BundleAnalyzerPlugin({
    openAnalyzer: true,
    analyzerMode: 'static', // server, static
    reportFilename: opt.filename || 'report.html'
  })
}

let htmlDefaults = {
  title: 'fle-cli',
  keywords: '',
  description: '',
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
    minifyURLs: true
  }
}

exports.html = (opt = {}) => {
  return new HtmlWebpackPlugin(Object.assign({}, htmlDefaults, opt))
}
