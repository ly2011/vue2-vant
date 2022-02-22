const _state = {
  user: null,
  btnAuthList: [], // 用户按钮权限
}

const mutations = {
  updateUser(state, payload) {
    state.user = payload
  },
  setBtnAuth(state, payload) {
    state.btnAuthList = payload
  },
}
const getters = {
  getUser(state) {
    return state.user
  },
  getBtnAuths(state) {
    return state.btnAuthList
  },
}
const actions = {
  changeUser({ commit }, user) {
    try {
      sessionStorage.setItem('user', user ? JSON.stringify(user) : user)
      commit('updateUser', user)
    } catch (error) {}
  },
}

export default {
  state: _state,
  getters,
  mutations,
  actions
}
