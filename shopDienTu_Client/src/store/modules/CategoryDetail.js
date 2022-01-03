import axios from 'axios'

const state = () => ({
  listCD: [],
})

// getters
const getters = {
  listCD: state => {
    return state.listCD
  },
}

// actions
const actions = {
  GetAllCD({
    commit
  }) {
    axios.get("https://localhost:44301/api/CategoryDetail/GetAll")
      .then((response) => {
        let listCD = response.data;
        commit('SET_LISTCD', listCD);
      }).catch((error) => {
        console.error(error);
      })
  },
}

// mutations
const mutations = {
  SET_LISTCD(state, listCD) {
    state.listCD = listCD;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
