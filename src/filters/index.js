import * as FormatFilter from './format'

export default {
  install (Vue) {
    Object.keys(FormatFilter).forEach((key) => {
      Vue.filter(key, FormatFilter[key])
    })
  }
}
