const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const CompressionWebpackPlugin = require('compression-webpack-plugin');
// const PrerenderSPAPlugin = require('prerender-spa-plugin')

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  pwa: {
    name: 'Browsing-Exp',
    themeColor: '#6476DB',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
      // ...other Workbox options...
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js').set('@', resolve('src'));
  },
  productionSourceMap: false, // 这里是为了上生产的时候不显示源码
  configureWebpack: config => {
    // webpack配置，值位对象时会合并配置，为方法时会改写配置
    if (process.env.NODE_ENV !== 'development') {
      // 开发环境配置
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ['console.log'] //移除console
            }
          },
          // sourceMap: config.build.productionSourceMap,
          parallel: true
        })
      );
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        })
      );
      // config.externals = {
      //   Vue: 'Vue',
      //   // 'vue-router': 'VueRouter',
      //   'element-ui': 'elementUi',
      //   axios: 'axios',
      // }
    } else {
      // 生产环境配置
      // config.plugins.push(
      //   new PrerenderSPAPlugin({
      //     // Required - The path to the webpack-outputted app to prerender.
      //     staticDir: path.join(__dirname, 'dist'),
      //     // Required - Routes to render.
      //     routes: ['/'],
      //   })
      // );
    }
    Object.assign(config, {
      // 开发生产共同配置
      // resolve: {
      //   alias: {
      //     '@': resolve('src'),
      //     'vue$': 'vue/dist/vue.esm.js'
      //   }
      // }
    });
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://10.100.160.147:80',
        // target: "http://172.24.248.154:80",
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    useLocalIp: true,
    open: true
  }
  // // 基本路径
  // baseUrl: '/',
  // // 输出文件目录
  // outputDir: 'dist',
  // // eslint-loader 是否在保存的时候检查
  // lintOnSave: true,
  // // use the full build with in-browser compiler?
  // // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  // compiler: false,
  // // webpack配置
  // // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // // chainWebpack: () => {},
  // configureWebpack: () => {},
  // // vue-loader 配置项
  // // https://vue-loader.vuejs.org/en/options.html
  // vueLoader: {},
  // // 生产环境是否生成 sourceMap 文件
  // productionSourceMap: true,
  // // css相关配置
  // css: {
  //  // 是否使用css分离插件 ExtractTextPlugin
  //  extract: true,
  //  // 开启 CSS source maps?
  //  sourceMap: false,
  //  // css预设器配置项
  //  loaderOptions: {},
  //  // 启用 CSS modules for all css / pre-processor files.
  //  modules: false
  // },
  // // use thread-loader for babel & TS in production build
  // // enabled by default if the machine has more than 1 cores
  // parallel: require('os').cpus().length > 1,
  // // 是否启用dll
  // // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  // dll: false,
  // // PWA 插件相关配置
  // // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  // pwa: {},
  // // webpack-dev-server 相关配置
  // devServer: {
  //  open: process.platform === 'darwin',
  //  host: '0.0.0.0',
  //  port: 3000,
  //  https: false,
  //  hotOnly: false,
  //  proxy: null, // 设置代理
  //  before: app => {}
  // },
  // // 第三方插件配置
  // pluginOptions: {
  //  // ...
  // }
};