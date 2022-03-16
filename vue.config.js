const path = require('path');
const fs = require('fs');
const WebpackZipPlugin = require('zip-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const VConsolePlugin = require('vconsole-webpack-plugin')
const cubeModule = require('./CubeModule.json');
const WebpackPlugin = require('./presets/webpack-plugin');

const resolve = dir => path.join(__dirname, dir);

const NODE_ENV = process.env.NODE_ENV;
const environment = process.env.environment;

const isDev = NODE_ENV === 'development';
const isPro = environment === 'prod';
// const isUat = environment === 'uat'
const buildEnv = isPro ? 'product' : 'test'; // 打包环境只有两种，一种是test,一种是生产

const theme = {
  'cell-vertical-padding': '8px',
  'dropdown-menu-title-font-size': '14px',
  'tabs-default-color': '#3792e3',
};

const changeBuildVersion = () => {
  let version = cubeModule.version.split('.');
  if (cubeModule[`${buildEnv}Version`]) {
    version = cubeModule[`${buildEnv}Version`].split('.');
  } else {
    version = [1, 0, 0]; // 默认初始化版本号为1.0.0
  }

  // let newVersion = [1, 0, 0] // 默认初始化版本号为1.0.0
  cubeModule.build = parseInt(`${version[0]}${version[1]}${version[2]}`, 10) * 100;
  cubeModule.version = version.join('.');
  cubeModule[`${buildEnv}Version`] = version.join('.');
  // console.error('package version:', version.join('.'), '  package build:', cubeModule.build)
  const rootPath = __dirname;
  fs.writeFileSync(`${rootPath}/CubeModule.json`, JSON.stringify(cubeModule, null, 2), 'utf-8');
};

if (!isDev) {
  changeBuildVersion();
}
module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
        // lessOptions: {
        modifyVars: theme,
        // }
      },
    },
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [resolve('src/styles/common/var.less')],
    },
  },

  chainWebpack: config => {
    config.plugin('define').tap(args => {
      const nextProcessEnv = { ...args[0]['process.env'] };
      nextProcessEnv.environment = JSON.stringify(process.env.environment);
      args[0]['process.env'] = nextProcessEnv;
      return args;
    });
    config.resolve.alias
      .set('@', resolve('src'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
      .set('assets', resolve('src/assets'))
      .set('styles', resolve('src/styles'))
      .set('filters', resolve('src/filters'))
      .set('plugins', resolve('src/plugins'))
      .set('config', resolve('src/config'))
      .set('utils', resolve('src/utils'))
      .set('services', resolve('src/services'))
      .set('store', resolve('src/store'));
    config.plugins.delete('prefetch');
    config.plugins.delete('preload');

    // config
    //   .plugin('unplugin-vue-components')
    //   .use(Components, [
    //     {
    //       resolvers: [VantResolver()],
    //     },
    //   ])
    //   .init((Plugin, args) => Plugin(...args));

    // config.plugin('vconsole').use(new VConsolePlugin({ enable: false }))
    config.plugin('copyCubeModule').use(
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, './CubeModule.json'),
          to: path.join(__dirname, './dist'),
        },
      ])
    );
    if (!isDev) {
      config.plugin('loadshReplace').use(new LodashModuleReplacementPlugin());
      config.plugin('zip').use(
        new WebpackZipPlugin({
          path: path.join(__dirname, './dist'),
          filename: `${cubeModule.identifier}-${cubeModule.name}-${cubeModule.version}-${buildEnv}.zip`,
        })
      );
      config.optimization
        .runtimeChunk(false) // share the same chunks across different modules
        .splitChunks({
          chunks: 'async',
          name: 'vendors',
          maxInitialRequests: Infinity,
          minSize: 0,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                if (!module.context) return null;
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                return `npm.${packageName.replace('@', '')}`;
              },
            },
          },
        });
    }
  },

  configureWebpack: {
    plugins: [...WebpackPlugin()],
  },
  productionSourceMap: false,
  parallel: false, // disable thread-loader, which is not compactible with unplugin-vue2-script-setup plugin

  devServer: {
    // useLocalIp: true,
    port: 5000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        pathRewrite: {
          '/api': '',
        },
      },
    },
  },
};
