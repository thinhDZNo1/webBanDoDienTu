import axios from 'axios'
import store from '..'

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
  AddMenu({}, menu) {
    axios.post('https://localhost:44301/api/Menu/InsertMenu', menu)
      .then((response) => {
        store.dispatch('Menu/GetAllMenu');
      })
      .catch((error) => {
        console.log(error)
      })
  },
  UpdateMenu({}, {
    menu
  }) {
    axios.put("https://localhost:44301/api/Menu/UpdateMenu", menu)
      .then((response) => {
        store.dispatch('Menu/GetAllMenu');
      })
      .catch((error) => {
        console.log(error)
      })
  },
  DeleteMenu({}, id){
    axios.delete("https://localhost:44301/api/Menu/DeleteMenu?id=" + id)
      .then((response) => {
        store.dispatch('Menu/GetAllMenu')
      })
      .catch((error) => {
        console.log(error)
      })
  }
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
