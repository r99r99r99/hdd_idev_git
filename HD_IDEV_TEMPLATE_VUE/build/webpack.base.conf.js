'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const {VueLoaderPlugin} = require('vue-loader')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath:
      process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath,
    sourcePrefix: ' '
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'idevvuejs': 'idevvue\\lib\\js',
      // 'idevvue$': 'idevvue/idv8.common.js',
      // 'idevvuejs/HdLayout$': config.dev.idevvuePath + '/views/layout/HdLayout',
      // 'idevvuejs/HdSearch$': config.dev.idevvuePath + '/views/layout/header/HeaderSearch',
      // 'idevvuejs/sysfieldframe$': config.dev.idevvuePath + '/views/privilege/syscode/sysfieldframe',
      // 'idevvuejs/menu$': config.dev.idevvuePath + '/views/privilege/menu/menu',
      // 'idevvuejs/menuinfo$': config.dev.idevvuePath + '/views/privilege/menu/menuinfo',
      // 'idevvuejs/userRole$': config.dev.idevvuePath + '/views/privilege/userRole/userRole',
      // 'idevvuejs/role$': config.dev.idevvuePath + '/views/privilege/role/role',
      // 'idevvuejs/orgDept$': config.dev.idevvuePath + '/views/privilege/orgDept/orgDept',
      // 'idevvuejs/personDept$': config.dev.idevvuePath + '/views/privilege/personDept/personDept',
      // 'idevvuejs/orgTree$': config.dev.idevvuePath + '/views/privilege/orgDept/orgTree.vue',
      // 'idevvuejs/commsg$': config.dev.idevvuePath + '/views/privilege/commsg/commsg.vue',
      // 'idevvuejs/commsgto$': config.dev.idevvuePath + '/views/privilege/commsg/commsgto.vue',
      // 'idevvuejs/syslog$': config.dev.idevvuePath + '/views/privilege/syslog/syslog.vue',
      // 'idevvuejs/syslogframe$': config.dev.idevvuePath + '/views/privilege/syslog/syslogframe.vue',
      // 'idevvuejs/comquartzlog$': config.dev.idevvuePath + '/views/privilege/quartz/comquartzlog.vue',
      // 'idevvuejs/comquartzjob$': config.dev.idevvuePath + '/views/privilege/quartz/comquartzjob.vue',
      // 'idevvuejs/comsearch$': config.dev.idevvuePath + '/views/privilege/search/comsearch.vue',
      // 'idevvuejs/authmobileupdate$': config.dev.idevvuePath + '/views/privilege/mobile/authmobileupdate.vue',
      // 'idevvuejs/comexfield$': config.dev.idevvuePath + '/views/privilege/exfield/comexfield.vue',

      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'views': path.resolve(__dirname, '../src/views'),
      'styles': path.resolve(__dirname, '../src/styles'),
      'api': path.resolve(__dirname, '../src/api'),
      'utils': path.resolve(__dirname, '../src/utils'),
      'store': path.resolve(__dirname, '../src/store'),
      'router': path.resolve(__dirname, '../src/router'),
      'mock': path.resolve(__dirname, '../src/mock'),
      'vendor': path.resolve(__dirname, '../src/vendor'),
      'static': path.resolve(__dirname, '../static'),
    }
  },
  module: {
    unknownContextCritical: false,
    //unknownContextRegExp: /^.\/.*$/,
    rules: [
      // ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory',
        include: [
          resolve('src'),
          resolve('test'),
          resolve('node_modules/webpack-dev-server/client')
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [resolve('src/icons')],
        options: {
          limit: 100000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [new VueLoaderPlugin()],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
