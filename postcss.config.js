const ignorePackages = [
  'node_modules/vant',
  '@fe'
]
module.exports = ({ file }) => {
  // 此规则是fixed: 升级vue-cli@5.0.3后，规则变更，file为文件路径
  const isIgnorePackage = file && ignorePackages.find(item => file.indexOf(item) > -1)  // 忽略第三方包的样式处理
  // 这个规则是vue-cli@4.4.1的规则，
  // const isIgnorePackage = file && file.dirname && ignorePackages.find(item => file.dirname.indexOf(item) > -1)  // 忽略第三方包的样式处理
  let vwUnit // 判断条件 请自行调整
  // fixed: 修复项目名称含有 vant (如本项目为vue2-vant) 导致下面的判断条件永远为  true！！！
  // if (file && file.dirname && (file.dirname.indexOf('vant') > -1 || file.dirname.indexOf('mescroll') > -1)) {
  if (isIgnorePackage) {
    vwUnit = 375
  } else {
    vwUnit = 750
  }

  return {
    plugins: [
      require('postcss-aspect-ratio-mini')(),
      require('postcss-cssnext')(),
      require('postcss-px-to-viewport')({
        viewportWidth: vwUnit,
        viewportHeight: 1334,
        unitPrecision: 5,
        viewportUnit: 'vw',
        selectorBlackList: ['.ignore', '.hairlines', 'van-circle__layer'],
        minPixelValue: 1,
        mediaQuery: false
      }),
      require('postcss-viewport-units')({
        silence: true,
        filterRule : rule => rule.selector.indexOf( ':after') === -1 && rule.selector.indexOf( ':before') === -1
      })
    ]
  }
}
