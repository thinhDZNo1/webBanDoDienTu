import axios from 'axios'

const state = () => ({
  listProduct: [],
  listProductSale: [],
  listProductLikeSame: [],
  product: null,
  listProductSearch: [],
})

// getters
const getters = {
  listProduct: state => {
    return state.listProduct
  },
  listProductSale: state => {
    return state.listProductSale
  },
  product: state => {
    return state.product
  },
  listProductLikeSame: state => {
    return state.listProductLikeSame
  },
  listProductSearch: state => {
    return state.listProductSearch
  }
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
  GetProductSale({
    commit
  }) {
    axios.get("https://localhost:44301/api/Product/GetProductSale")
      .then((response) => {
        let listProductSale = response.data;
        commit('SET_LISTPRODUCTSALE', listProductSale);
      }).catch((error) => {
        console.error(error);
      })
  },

  GetProductLikeSame({
    commit
  }, {cdId, companyId}) {
    axios.get("https://localhost:44301/api/Product/GetProductLikeSame?cdId="+cdId+"&companyId="+companyId)
      .then((response) => {
        let listProductLikeSame = response.data;
        commit('SET_PRODUCTLIKESAME', listProductLikeSame);
      }).catch((error) => {
        console.error(error);
      })
  },
  GetProduct({
    commit
  }, id) {
    axios.get("https://localhost:44301/api/Product/GetProduct?id=" + id)
      .then((response) => {
        let product = response.data;
        commit('SET_PRODUCT', product);
      }).catch((error) => {
        console.error(error);
      })
  },
  Search({
    commit
  }, keyWord) {
    axios.get("https://localhost:44301/api/Product/SearchProduct?keyWord=" + keyWord)
      .then((response) => {
        let listProductSearch = response.data;
        commit('SET_PRODUCTSEARCH', listProductSearch);
      }).catch((error) => {
        console.error(error);
      })
  },
}

// mutations
const mutations = {
  SET_LISTPRODUCT(state, listProduct) {
    state.listProduct = listProduct;
  },
  SET_LISTPRODUCTSALE(state, listProductSale) {
    state.listProductSale = listProductSale;
  },
  SET_PRODUCT(state, product) {
    state.product = product;
  },

  SET_PRODUCTLIKESAME(state, listProductLikeSame) {
    state.listProductLikeSame = listProductLikeSame;
  },
  SET_PRODUCTSEARCH(state, listProductSearch) {
    state.listProductSearch = listProductSearch;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
