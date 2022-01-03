import axios from 'axios'
import store from '..'

const state = () => ({
  listProductType: [],
})

// getters
const getters = {
  listProductType: state => {
    return state.listProductType
  },
}

// actions
const actions = {
  GetAllPT({
    commit
  }) {
    axios.get("https://localhost:44301/api/ProductType/GetAll")
      .then((response) => {
        let listProductType = response.data;
        commit('SET_LISTPT', listProductType);
      }).catch((error) => {
        console.error(error);
      })
  },
  AddProductType({}, ProductType) {
    axios.post('https://localhost:44301/api/ProductType/InsertProductType', ProductType)
      .then((response) => {
        store.dispatch('ProductType/GetAllPT');
      })
      .catch((error) => {
        console.log(error)
      })
  },
  DeleteProductType({}, id){
    axios.delete("https://localhost:44301/api/ProductType/DeleteProductType?id=" + id)
      .then((response) => {
        store.dispatch('ProductType/GetAllPT')
      })
      .catch((error) => {
        console.log(error)
      })
  },
  UpdateProductType({}, {
    ProductType
  }) {
    axios.put("https://localhost:44301/api/ProductType/UpdateProductType", ProductType)
      .then((response) => {
        store.dispatch('ProductType/GetAllPT');
      })
      .catch((error) => {
        console.log(error)
      })
  },
}

// mutations
const mutations = {
  SET_LISTPT(state, listProductType) {
    state.listProductType = listProductType;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
