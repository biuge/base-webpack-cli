let path = require('path')
let merge = require('webpack-merge')
let plugin = require('./plugin')
let { getPages } = require('./utils')

let baseWebpackConfig = require('./webpack.base.config')

let entry = {}
let htmlConfigs = []
let pages = getPages(path.resolve('src'))
pages.forEach(page => {
  entry[page.id] = page.entry

  page.template = path.resolve('index.html')
  page.filename = 'html/' + page.id + '.html'
  page.chunks = [page.id]

  htmlConfigs.push(page)
})

let htmls = htmlConfigs.map(config => plugin.html(config))
// 基本配置
let webpackConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: entry,
  output: {
    publicPath: '/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js'
  },
  plugins: [
    plugin.hmr(),
    plugin.friendlyErrors()
  ].concat(htmls),
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
      poll: true
    }
  }
}

module.exports = merge(
  baseWebpackConfig,
  webpackConfig
)
