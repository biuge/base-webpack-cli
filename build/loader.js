const fs = require('fs');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const resolve = path.resolve;
const dev = process.env.NODE_ENV === 'development';

const styleLoader = {
  loader: 'style-loader',
  options: {
    sourceMap: dev,
  },
};

// css
const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: dev,
    modules: false,
    importLoaders: 1,
  },
};

const lessLoader = {
  loader: 'less-loader',
  options: {
    javascriptEnabled: true,
    sourceMap: dev,
  },
};
const moduleCSSLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: dev,
    modules: true,
    camelCase: 'only',
    importLoaders: 1,
    localIdentName: '[path]___[local]___[hash:base64:5]',
  },
};

// postcss
const postCSSLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: dev,
    config: {
      path: path.join(__dirname, './postcss.config.js'),
    },
  },
};

function getCSSLoaders(modules) {
  return dev
    ? [styleLoader, modules ? moduleCSSLoader : cssLoader, postCSSLoader]
    : [MiniCssExtractPlugin.loader, modules ? moduleCSSLoader : cssLoader, postCSSLoader];
}

// css 特殊的写法可以参考demo里的xx.module.css 这是开启了局部作用域的css写法
// 因为启用antd框架启用了less所以我们还需要加载less-loader 这里自行判断要用那个写
exports.css = () => {
  return {
    test: /\.css$/,
    exclude: /\.module\.css$/,
    oneOf: [
      // this matches `<style module>`
      {
        resourceQuery: /module/,
        use: getCSSLoaders(true),
      },
      // this matches plain `<style>` or `<style scoped>`
      {
        use: getCSSLoaders(false),
      },
    ],
  };
};

exports.less = () => {
  return {
    test: /\.less$/,
    include: /node_modules/,
    // include: path.join(__dirname, '/node_modules/antd-mobile'),
    use: [styleLoader, cssLoader, lessLoader],
  };
};

exports.lessModules = () => {
  return {
    test: /\.less$/,
    exclude: /node_modules/,
    // include: path.join(__dirname, '/node_modules/antd-mobile'),
    use: [styleLoader, moduleCSSLoader, lessLoader],
  };
};

exports.cssModules = () => {
  return {
    test: /\.module\.css$/,
    use: getCSSLoaders(true),
  };
};

// eslint
exports.eslint = () => {
  return {
    enforce: 'pre',
    test: /\.(jsx?|vue)$/,
    loader: 'eslint-loader',
    include: resolve('src'),
    options: {
      fix: true,
      cache: dev ? resolve('.cache/eslint') : false,
      failOnError: !dev, // 生产环境发现代码不合法，则中断编译
      useEslintrc: true,
      formatter: require('eslint-friendly-formatter'),
    },
  };
};

// babel
exports.babel = () => {
  return {
    test: /\.jsx?$/,
    // include: resolve('src'),
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: resolve('.cache/babel'),
        babelrc: true,
      },
    },
  };
};

// images
exports.images = (opt = {}) => {
  return {
    test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 3000,
          name: opt.filename || 'images/[name].[hash:8].[ext]',
        },
      },
      // 生产模式启用图片压缩
      !dev && {
        loader: 'imagemin-loader',
        options: {
          plugins: [
            {
              use: 'imagemin-pngquant',
            },
            {
              use: 'imagemin-mozjpeg',
            },
            // {
            //   use: 'imagemin-guetzli'
            // },
            // {
            //   use: 'imagemin-gifsicle'
            // },
            // {
            //   use: 'imagemin-svgo'
            // },
            // {
            //   use: 'imagemin-webp'
            // }
          ],
        },
      },
    ].filter(p => p),
  };
};

// fonts
exports.fonts = (opt = {}) => {
  return {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 3000,
      name: opt.filename || 'fonts/[name].[hash:8].[ext]',
    },
  };
};

// media
exports.medias = (opt = {}) => {
  return {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 3000,
      name: opt.filename || 'medias/[name].[hash:8].[ext]',
    },
  };
};

// text
exports.text = () => {
  return {
    test: /\.(md|txt|tpl)$/,
    loader: 'raw-loader',
  };
};
