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
  AddCD({}, categoryDetail) {
    axios.post('https://localhost:44301/api/CategoryDetail/InsertCategoryDetail', categoryDetail)
      .then((response) => {
        store.dispatch('CategoryDetail/GetAllCD');
      })
      .catch((error) => {
        console.log(error)
      })
  },
  UpdateCD({}, {
    categoryDetail
  }) {
    axios.put("https://localhost:44301/api/CategoryDetail/UpdateCategoryDetail", categoryDetail)
      .then((response) => {
        store.dispatch("CategoryDetail/GetAllCD");
      })
      .catch((error) => {
        console.log(error)
      })
  },
  DeleteCD({}, id) {
    axios.delete("https://localhost:44301/api/CategoryDetail/DeleteCategoryDetail?id=" + id)
      .then((response) => {
        store.dispatch("CategoryDetail/GetAllCD")
      })
      .catch((error) => {
        console.log(error)
      })
  }
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
