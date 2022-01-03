import axios from 'axios'
import store from '..'

const state = () => ({
  listConfirmOrder: [],
})

// getters
const getters = {
  listConfirmOrder: state => {
    return state.listConfirmOrder
  },
}

// actions
const actions = {
  GetAllConfirmOrder({
    commit
  }) {
    axios.get("https://localhost:44301/api/ConfirmOrder/GetAll")
      .then((response) => {
        let listConfirmOrder = response.data;
        commit('SET_LISTCO', listConfirmOrder);
      }).catch((error) => {
        console.error(error);
      })
  },

}

// mutations
const mutations = {
  SET_LISTCO(state, listConfirmOrder) {
    state.listConfirmOrder = listConfirmOrder;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
