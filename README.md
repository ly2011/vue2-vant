# 基于Vue2+vant移动端项目

## 特性

- git commit message 校验
- 移动端样式自适应(vw/vh)
- lodash体积优化
- webpack5
- 支持自动导入vant组件
- 支持 `<script setup>` 语法

## 使用教程

**样式必须使用 `less`**

### 运行

**强制使用 `yarn` 来安装依赖包**

```bash
yarn install

# 启动
yarn serve

# 测试环境打包
> 打包前需手动更改 CubeModule.json 配置 testVersion，小版本号+1
yarn build

# 生产环境打包
> 打包前需手动更改 CubeModule.json 配置 productVersion，小版本号+1
yarn prod
```

### 项目目录规范

```js
|- src: 平时开发的文件都在这里
    |- assets: 存放静态资源
    |- components: 存放公共组件(分为基础组件和业务组件)
    |- config: 存放全局的配置信息
    |- store: 存放全局的数据中心
    |- pages: 存放页面文件
    |- services: 存放全局的数据请求
    |- styles: 全局的样式
    |- utils: 存放公共方法
    |- main.js: 入口文件
    |- CubeModule.json: APP版本管理
```

### 风格指南请参照 [Vue官方风格指南](https://cn.vuejs.org/v2/style-guide)

