const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const NodePolyfill = require('@rspack/plugin-node-polyfill');

const resolve = dir => path.join(__dirname, dir);

/** @type {import('@rspack/cli').Configuration} */
const config = {
  context: __dirname,
  entry: {
    main: './src/main.js',
  },
  builtins: {
    html: [
      {
        template: './index.html',
      },
    ],
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.environment': JSON.stringify(process.env.environment),
      'process.env.NODE_DEBUG': JSON.stringify(false),
      'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
    },
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
        use: ['vue-style-loader', 'css-loader', 'less-loader'],
        type: 'javascript/auto',
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
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
              presets: ['@vue/babel-preset-jsx'],
              // plugins: ['@vue/babel-plugin-jsx'],
            },
          },
        ],
      },
    ],
  },
};
module.exports = config;
