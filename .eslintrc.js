const path = require('path')
module.exports = {
  root: true,

  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "plugin:sonarjs/recommended", "@vue/prettier"],
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'linebreak-style': [0, 'error', 'windows'],
    // 'handle-callback-err': 'off',
    // 'max-len': [
    //   'error',
    //   {
    //     code: 1000
    //   }
    // ],
    // 'no-plusplus': 'off',
    // 'prefer-destructuring': 'off',
    // 'no-param-reassign': 'off',
    // 'array-callback-return': 'off',
    // // 'import/extensions': [
    // //   'error',
    // //   'ignorePackages',
    // //   {
    // //     js: 'never',
    // //     jsx: 'never',
    // //     ts: 'never',
    // //     tsx: 'never',
    // //     mjs: 'never',
    // //     vue: 'never'
    // //   }
    // // ],
    // indent: [
    //   'warn',
    //   2,
    //   {
    //     ignoredNodes: ['TemplateLiteral'],
    //     SwitchCase: 1
    //   }
    // ],
    // 'template-curly-spacing': 'off',
    // 'space-before-blocks': [2, 'always'],
    // 'space-in-parens': [2, 'never'],
    // 'consistent-return': 'off',
    // 'standard/no-callback-literal': 'off',
    // semi: [
    //   2,
    //   'never'
    // ],
    // 'vue/max-attributes-per-line': [
    //   2,
    //   {
    //     singleline: 100,
    //     multiline: {
    //       max: 1,
    //       allowFirstLine: false
    //     }
    //   }
    // ],
    // 'import/prefer-default-export': 'off',
    // 'comma-dangle': [2, 'never'],
    // 'comma-spacing': [
    //   2,
    //   {
    //     before: false,
    //     after: true
    //   }
    // ],
    // 'comma-style': [2, 'last'],
    // 'block-spacing': [2, 'always'],
    // 'brace-style': [
    //   2,
    //   '1tbs',
    //   {
    //     allowSingleLine: true
    //   }
    // ],
    // camelcase: [
    //   0,
    //   {
    //     properties: 'always'
    //   }
    // ],
    // 'func-names': 'off',
    // 'arrow-parens': 'off',
    // 'vue/singleline-html-element-content-newline': 'off',
    // 'vue/multiline-html-element-content-newline': 'off',
    // 'vue/name-property-casing': ['error', 'PascalCase'],
    // 'vue/no-v-html': 'off',
    // 'space-before-function-paren': [2, 'always'], // 自动添加空格
    "sonarjs/cognitive-complexity": ["error", 15],
    'no-multi-spaces': 'error', // 禁止多个空格
    'semi': [2, 'always'],// 自动补充分号
    'quotes': ['error', 'single'], // 使用单引号
    'prettier/prettier': [
      'error',
      {
        semi: true, // 是否使用分号, 默认true
        singleQuote: true, // 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
      },
    ],
  },

  globals: {
    page: true,
    axios: true
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', path.resolve(__dirname, 'src')],
          ['services', path.resolve(__dirname, 'src/services')],
          ['store', path.resolve(__dirname, 'src/store')],
          ['utils', path.resolve(__dirname, 'src/utils')],
          ['config', path.resolve(__dirname, 'src/config')],
          ['views', path.resolve(__dirname, 'src/views')],
          ['components', path.resolve(__dirname, 'src/components')],
          ['assets', path.resolve(__dirname, 'src/assets')],
          ['filters', path.resolve(__dirname, 'src/filters')],
          ['styles', path.resolve(__dirname, 'src/styles')],
          ['plugins', path.resolve(__dirname, 'src/plugins')],
          ['APP_ROOT', path.resolve(__dirname)]
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.vue']
      }
    }
  }

}
