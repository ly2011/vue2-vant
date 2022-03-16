const { resolve } = require('path');
// const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { VantResolver } = require('unplugin-vue-components/resolvers');

const webpackPlugin = () => [
  // 组件自动按需导入
  Components({
    // 要搜索组件的目录的相对路径
    dirs: ['src/components', 'src/views/**/components'],
    // 搜索子目录
    deep: true,
    extensions: ['vue', 'js', 'jsx', 'ts', 'tsx'],
    include: [/\.vue$/, /\.vue\?vue/, /\.js$/, /\.jsx$/, /\.ts$/, /\.tsx$/],
    dts: resolve(__dirname, './types/components.d.ts'),
    resolvers: [VantResolver()],
  }),
  // api 自动按需导入，TODO: 由于对js+eslint侵入性太强且不好用，这个功能暂且关闭
  // AutoImport({
  //   dts: resolve(__dirname, './types/auto-imports.d.ts'),
  //   imports: [
  //     'vue-router',
  //     'vuex',
  //     '@vue/composition-api',
  //     // {
  //     //   axios: [
  //     //     // default imports
  //     //     ['default', 'axios'], // import { default as axios } from 'axios',
  //     //   ],
  //     // },
  //   ],
  //   resolvers: [VantResolver()],
  // }),
];

module.exports = webpackPlugin;
