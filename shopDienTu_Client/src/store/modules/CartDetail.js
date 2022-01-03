import axios from 'axios'

const state = () => ({
  listCartDetail: [],
})

// getters
const getters = {
  listCartDetail: state => {
    return state.listCartDetail
  },
  listProductWithCartDetail: state =>{
    return state.listProductWithCartDetail
  }
}

// actions
const actions = {
  GetCartByUser({
    commit
  }, userId) {
    axios.get("https://localhost:44301/api/CartDetail/GetCartByUser?userId="+ userId)
      .then((response) => {
        let listCartDetail = response.data;
        commit('SET_LISTCD', listCartDetail);
      }).catch((error) => {
        console.error(error);
      })
  },
  AddCartDetail({}, CartDetail) {
    axios.post('https://localhost:44301/api/CartDetail/AddToCart', CartDetail)
      .then((response) => {
        store.dispatch('CartDetail/GetCartByUser');
      })
      .catch((error) => {
        console.log(error)
      })
  },
  ConfirmCart({}, {
    CartDetail
  }) {
    axios.put("https://localhost:44301/api/CartDetail/ConfirmCart", CartDetail)
      .then((response) => {
        store.dispatch('CartDetail/GetCartByUser');
      })
      .catch((error) => {
        console.log(error)
      })
  },
  DeleteCartDetail({}, id){
    axios.delete("https://localhost:44301/api/CartDetail/DeleteCartDetail?id=" + id)
      .then((response) => {
        store.dispatch('CartDetail/GetCartByUser')
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

// mutations
const mutations = {
  SET_LISTCD(state, listCartDetail) {
    state.listCartDetail = listCartDetail;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
