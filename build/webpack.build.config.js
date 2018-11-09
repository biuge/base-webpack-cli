let fs = require('fs')
let path = require('path')
let merge = require('webpack-merge')
let plugin = require('./plugin')
let { getPages } = require('./utils')

let baseWebpackConfig = require('./webpack.base.config')

let entry = {}
let htmls = []
let pages = getPages(path.resolve('src'))

pages.forEach(page => {
  entry[page.id] = page.entry

  page.template = path.resolve('index.html')
  page.filename = 'html/' + page.id + '.html'
  page.chunks = ['runtime', 'vendors', 'commons', page.id]

  htmls.push(plugin.html(page))
})

let webpackConfig = {
  mode: 'production',
  entry: entry,
  output: {
    path: path.resolve('dist'),
    publicPath: '../',
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js'
  },
  optimization: {
    minimizer: [
      plugin.uglify(),
      plugin.optimizeCSS()
    ],
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          minSize: 30000,
          minChunks: 1,
          // all无论是异步加载的模块还是静态模块的node_modules都会打包进来；此处如果使用initial就是页面初始那些chunks async 则异步加载文件中的包会被打包进对应的js代码里
          chunks: 'initial',
          priority: 1
        },
        commons: {
          test: /[\\/]src[\\/]common[\\/]/,
          name: 'commons',
          minSize: 30000,
          minChunks: 2, // 达到被3个引用的才抽出成为common
          chunks: 'all',
          priority: -1,
          // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的
          reuseExistingChunk: true

        }
      }
    }
  },
  plugins: [
    plugin.merge(),
    plugin.hash(),
    plugin.extractCSS(),
    plugin.analyzer({
      filename: '../.cache/report.build.html'
    })
  ].concat(htmls, [
    plugin.inlineManifest()
  ]),
  externals: {}
}

module.exports = merge(
  baseWebpackConfig,
  webpackConfig
)
