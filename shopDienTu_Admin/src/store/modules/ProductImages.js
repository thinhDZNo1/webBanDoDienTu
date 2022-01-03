import axios from 'axios'
import store from '..'

const state = () => ({
  listProductImage: [],
})

// getters
const getters = {
  listProductImage: state => {
    return state.listProductImage
  },
}

// actions
const actions = {
  GetAllProductImage({
    commit
  }) {
    axios.get("https://localhost:44301/api/ProductImage/GetAll")
      .then((response) => {
        let listProductImage = response.data;
        commit('SET_LISTPRODUCTIMG', listProductImage);
      }).catch((error) => {
        console.error(error);
      })
  },
  AddProductImage({}, ProductImage) {
    axios.post('https://localhost:44301/api/ProductImage/InsertProductImage', ProductImage)
      .then((response) => {
        store.dispatch('ProductImage/GetAllProductImage');
      })
      .catch((error) => {
        console.log(error)
      })
  },
  DeleteProductImage({}, id){
    axios.delete("https://localhost:44301/api/ProductImage/DeleteProductImage?id=" + id)
      .then((response) => {
        store.dispatch('ProductImage/GetAllProductImage')
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

// mutations
const mutations = {
  SET_LISTPRODUCTIMG(state, listProductImage) {
    state.listProductImage = listProductImage;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
