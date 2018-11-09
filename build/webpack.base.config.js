let path = require('path')
let loader = require('./loader')
let plugin = require('./plugin')

// 基本配置
let webpackConfig = {
  // entry: {},
  cache: true,
  devtool: false,
  // output: {},
  resolve: {
    modules: [
      path.resolve('node_modules')
    ],
    extensions: ['.js', '.vue', '.jsx', '.css'],
    alias: {
      '@': path.resolve('src')
    }
  },
  resolveLoader: {
    modules: [
      path.resolve('node_modules')
    ]
  },
  module: {
    rules: [
      loader.eslint(),
      loader.css(),
      loader.cssModules(),
      loader.babel(),
      loader.text(),
      loader.images(),
      loader.fonts(),
      loader.medias()
    ]
  },
  // 配置插件
  plugins: [
    plugin.define()
  ],
  externals: {},
  target: 'web'
}

module.exports = webpackConfig
