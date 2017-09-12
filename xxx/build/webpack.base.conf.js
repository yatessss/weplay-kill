var path = require('path')
var fs = require('fs')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var autoprefixer = require('autoprefixer')
var px2rem = require('postcss-px2rem')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    },
    symlinks: false
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(less|css|scss|sass)$/,
        loader: "style-loader!css-loader!postcss-loader",
        include: [
          /src/,
          '/node_modules/iview/dist/style/' //增加此项,后面引入mint-ui时需要
        ],
        options: {
          postcss: [require('postcss-px2rem')({
            baseDpr: 2,             // base device pixel ratio (default: 2)
            threeVersion: false,    // whether to generate @1x, @2x and @3x version (default: false)
            remVersion: true,       // whether to generate rem version (default: true)
            remUnit: 37.5,            // rem unit value (default: 75)
            remPrecision: 6         // rem precision (default: 6)
          })]
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          publicPath: '/static/',
          outputPath: 'static/',
          limit: 10000,
          name: '/fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  }
}
