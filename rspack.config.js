const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const NodePolyfill = require('@rspack/plugin-node-polyfill');
// const html = require('@rspack/plugin-html').default;
const env = process.env.NODE_ENV || 'development';
const dotEnvFiles = env === 'development' ? ['.env.development'] : ['.env.production'];

dotEnvFiles.forEach(doteEnvFile => {
  const myEnv = require('dotenv').config({ path: doteEnvFile });
  require('dotenv-expand').expand(myEnv);
  // console.log(process.env);
});
// const VUE_APP = /^VUE_APP_/i;

const filterEnv = {};
const define = Object.keys(process.env)
  // .filter(key => VUE_APP.test(key))
  .reduce((env, key) => {
    filterEnv[key] = process.env[key];
    env[`process.env.${key}`] = JSON.stringify(process.env[key]);
    return env;
  }, {});

const resolve = dir => path.join(__dirname, dir);

// const postcssOptions = {
//   // ident: 'postcss',
//   // config: false,
//   plugins: [
//     'postcss-flexbugs-fixes',
//     ['postcss-preset-env', { autoprefixer: { flexbox: 'no-2009' }, stage: 3 }],
//     require('postcss-px-to-viewport')({
//       viewportWidth: 750,
//       viewportHeight: 1334,
//       unitPrecision: 5,
//       viewportUnit: 'vw',
//       selectorBlackList: ['.ignore', '.hairlines', 'van-circle__layer'],
//       minPixelValue: 1,
//       mediaQuery: false,
//     }),
//   ],
// };

/** @type {import('@rspack/cli').Configuration} */
const config = {
  context: __dirname,
  entry: {
    main: './src/main.js',
  },
  builtins: {
    html: [
      {
        template: './public/index.html',
        title: '基于vue2的移动端模板',
      },
    ],
    define: {
      targets: ['es2022'],
      ...define,
      'import.meta.env && import.meta.env.MODE': JSON.stringify(process.env.NODE_ENV || 'production'),
      'process.env': JSON.stringify(filterEnv),
    },
    copy: {
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    },
    pluginImport: [
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true,
      },
    ],
    // define: {
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    //   'process.env.environment': JSON.stringify(process.env.environment),
    //   'process.env.NODE_DEBUG': JSON.stringify(false),
    //   'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
    // },
  },
  devServer: {
    historyApiFallback: true,
  },
  devtool: false,
  resolve: {
    alias: {
      '@': resolve('src'),
      components: resolve('src/components'),
      views: resolve('src/views'),
      assets: resolve('src/assets'),
      styles: resolve('src/styles'),
      filters: resolve('src/filters'),
      plugins: resolve('src/plugins'),
      config: resolve('src/config'),
      utils: resolve('src/utils'),
      services: resolve('src/services'),
      store: resolve('src/store'),
    },
    extensions: ['.js', '.jsx', '.jsx', '.tsx', '.vue', '.json', '.mjs'],
  },
  plugins: [new VueLoaderPlugin(), new NodePolyfill()],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              // postcssOptions,
            },
          },
          'less-loader',
        ],
        type: 'javascript/auto',
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              // postcssOptions,
            },
          },
        ],
        type: 'javascript/auto',
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
      },
      {
        test: /\.(png|jpg|jpeg|ico|gif)?$/,
        type: 'asset/resource',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
      },
      {
        test: /\.jsx$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // presets: ['@vue/babel-preset-jsx'],
              // plugins: ['@vue/babel-plugin-jsx'],
            },
          },
        ],
      },
    ],
  },
  optimization: {
    sideEffects: false,
    moduleIds: 'named',
    minimize: false,
  },
};
module.exports = config;
