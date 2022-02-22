module.exports = {
  tabWidth: 2,
  useTabs: false,
  printWidth: 150,
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  semi: false,
  // parser: 'babylon',
  proseWrap: 'always',
  eslintIntegration: true,
  arrowParens: 'avoid', // (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
  disableLanguages: ['vue'], // 不格式化vue文件，vue文件的格式化单独设置
  endOfLine: 'auto', // 结尾是 \n \r \n\r auto
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json'
      }
    },
    {
      files: 'document.ejs',
      options: {
        parser: 'html'
      }
    }
  ]
}
