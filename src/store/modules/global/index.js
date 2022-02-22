
const _state = {
  allDicts: {},
  normalizeAllDicts: {},
  allArea: [],
  normalizeallArea: {},
  normalizeallArea: {},
  enterPageTime: Date.now()
}

const mutations = {
  saveAllDicts(state, payload) {
    state.allDicts = payload
  },
  saveAllArea(state, payload) {
    state.allArea = payload
  },
  saveNormalizeAllDicts(state, payload) {
    state.normalizeAllDicts = payload
  },
  saveNormalizeallArea(state, payload) {
    state.normalizeallArea = payload
  },
  saveEnterPageTime(state, payload) {
    state.enterPageTime = payload
  }
}
const getters = {
  allDicts(state) {
    return state.allDicts
  },
  allArea(state) {
    return state.allArea
  },
  normalizeAllDicts(state) {
    return state.normalizeAllDicts
  },
  normalizeallArea(state) {
    return state.normalizeallArea
  },
  enterPageTime(state) {
    return state.enterPageTime
  }
}
const actions = {
}

export default {
  state: _state,
  getters,
  mutations,
  actions
}
