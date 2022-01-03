import axios from 'axios'
import store from '..'

const state = () => ({
  listColor: [],
})

// getters
const getters = {
  listColor: state => {
    return state.listColor
  },
}

// actions
const actions = {
  GetAllColor({
    commit
  }) {
    axios.get("https://localhost:44301/api/Color/GetAll")
      .then((response) => {
        let listColor = response.data;
        commit('SET_LISTCOLOR', listColor);
      }).catch((error) => {
        console.error(error);
      })
  },
  AddColor({}, color) {
    axios.post('https://localhost:44301/api/Color/InsertColor', color)
      .then((response) => {
        store.dispatch('Color/GetAllColor');
      })
      .catch((error) => {
        console.log(error)
      })
  },
  UpdateColor({}, {
    color
  }) {
    axios.put("https://localhost:44301/api/Color/UpdateColor", color)
      .then((response) => {
        store.dispatch('Color/GetAllColor');
      })
      .catch((error) => {
        console.log(error)
      })
  },
  DeleteColor({}, id){
    axios.delete("https://localhost:44301/api/Color/DeleteColor?id=" + id)
      .then((response) => {
        store.dispatch('Color/GetAllColor')
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

// mutations
const mutations = {
  SET_LISTCOLOR(state, listColor) {
    state.listColor = listColor;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
