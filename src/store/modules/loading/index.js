const _state = {
  loading: false,
};
const mutations = {
  updateLoading(state, loading) {
    state.loading = loading;
  },
};
const getters = {
  getLoading(state) {
    return state.loading;
  },
};

const actions = {
  changeLoading(context, loading) {
    context.commit('updateLoading', loading);
  },
};

export default {
  state: _state,
  mutations,
  getters,
  actions,
};
