import axios from 'axios'
import store from '..'

const state = () => ({
  listCompany: [],
})

// getters
const getters = {
  listCompany: state => {
    return state.listCompany
  },
}

// actions
const actions = {
  GetAllCompany({
    commit
  }) {
    axios.get("https://localhost:44301/api/Company/GetAll")
      .then((response) => {
        let listCompany = response.data;
        commit('SET_LISTCOMPANY', listCompany);
      }).catch((error) => {
        console.error(error);
      })
  },
  AddCompany({}, company) {
    axios.post('https://localhost:44301/api/Company/InsertCompany', company)
      .then((response) => {
        store.dispatch('Company/GetAllCompany');
      })
      .catch((error) => {
        console.log(error)
      })
  },
  UpdateCompany({}, {
    company
  }) {
    axios.put("https://localhost:44301/api/Company/UpdateCompany", company)
      .then((response) => {
        store.dispatch('Company/GetAllCompany');
      })
      .catch((error) => {
        console.log(error)
      })
  },
  DeleteCompany({}, id){
    axios.delete("https://localhost:44301/api/Company/DeleteCompany?id=" + id)
      .then((response) => {
        store.dispatch('Company/GetAllCompany')
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

// mutations
const mutations = {
  SET_LISTCOMPANY(state, listCompany) {
    state.listCompany = listCompany;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
