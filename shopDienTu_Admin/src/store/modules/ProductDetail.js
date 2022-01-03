import axios from 'axios'
import store from '..'

const state = () => ({
  listProductDetail: [],
})

// getters
const getters = {
  listProductDetail: state => {
    return state.listProductDetail
  },
}

// actions
const actions = {
  GetAllProductDetail({
    commit
  }) {
    axios.get("https://localhost:44301/api/ProductDetail/GetAll")
      .then((response) => {
        let listProductDetail = response.data;
        commit('SET_LISTPD', listProductDetail);
      }).catch((error) => {
        console.error(error);
      })
  },
  AddProductDetail({}, ProductDetail) {
    axios.post('https://localhost:44301/api/ProductDetail/InsertProductDetail', ProductDetail)
      .then((response) => {
        store.dispatch('ProductDetail/GetAllProductDetail');
      })
      .catch((error) => {
        console.log(error)
      })
  },
  UpdateProductDetail({}, {
    ProductDetail
  }) {
    axios.put("https://localhost:44301/api/ProductDetail/UpdateProductDetail", ProductDetail)
      .then((response) => {
        store.dispatch('ProductDetail/GetAllProductDetail');
      })
      .catch((error) => {
        console.log(error)
      })
  },
  DeleteProductDetail({}, id){
    axios.delete("https://localhost:44301/api/ProductDetail/DeleteProductDetail?id=" + id)
      .then((response) => {
        store.dispatch('ProductDetail/GetAllProductDetail')
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

// mutations
const mutations = {
  SET_LISTPD(state, listProductDetail) {
    state.listProductDetail = listProductDetail;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
