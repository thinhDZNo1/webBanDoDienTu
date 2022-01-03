import axios from 'axios'
import store from '..'

const state = () => ({
  listProduct: [],
})

// getters
const getters = {
  listProduct: state => {
    return state.listProduct
  },
}

// actions
const actions = {
  GetAllProduct({
    commit
  }) {
    axios.get("https://localhost:44301/api/Product/GetAll")
      .then((response) => {
        let listProduct = response.data;
        commit('SET_LISTPRODUCT', listProduct);
      }).catch((error) => {
        console.error(error);
      })
  },
  AddProduct({}, product) {
    axios.post('https://localhost:44301/api/Product/InsertProduct', product)
      .then((response) => {
        store.dispatch('Product/GetAllProduct');
      })
      .catch((error) => {
        console.log(error)
      })
  },
  UpdateProduct({}, {
    product
  }) {
    axios.put("https://localhost:44301/api/Product/UpdateProduct", product)
      .then((response) => {
        store.dispatch('Product/GetAllProduct');
      })
      .catch((error) => {
        console.log(error)
      })
  },
  DeleteProduct({}, id){
    axios.delete("https://localhost:44301/api/Product/DeleteProduct?id=" + id)
      .then((response) => {
        store.dispatch('Product/GetAllProduct')
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

// mutations
const mutations = {
  SET_LISTPRODUCT(state, listProduct) {
    state.listProduct = listProduct;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
