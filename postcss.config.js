module.exports = ({ file }) => {
  let vwUnit // 判断条件 请自行调整
  if (file && file.dirname && (file.dirname.indexOf('vant') > -1 || file.dirname.indexOf('mescroll') > -1)) {
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
