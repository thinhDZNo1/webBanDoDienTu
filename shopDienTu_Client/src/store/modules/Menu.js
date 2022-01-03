import axios from 'axios'

const state = () => ({
  listMenu: [],
})

// getters
const getters = {
  listMenu: state => {
    return state.listMenu
  },
}

// actions
const actions = {
  GetAllMenu({
    commit
  }) {
    axios.get("https://localhost:44301/api/Menu/GetAll")
      .then((response) => {
        let listMenu = response.data;
        commit('SET_LISTMENU', listMenu);
      }).catch((error) => {
        console.error(error);
      })
  },
}

// mutations
const mutations = {
  SET_LISTMENU(state, listMenu) {
    state.listMenu = listMenu;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
