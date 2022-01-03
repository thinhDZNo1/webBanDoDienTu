import axios from 'axios'

const state = () => ({
  listCategory: [],
  listProductWithCategory: [],
})

// getters
const getters = {
  listCategory: state => {
    return state.listCategory
  },
  listProductWithCategory: state =>{
    return state.listProductWithCategory
  }
}

// actions
const actions = {
  GetAllCategory({
    commit
  }) {
    axios.get("https://localhost:44301/api/Category/GetAll")
      .then((response) => {
        let listCategory = response.data;
        commit('SET_LISTCATEGORY', listCategory);
      }).catch((error) => {
        console.error(error);
      })
  },
  GetProductWithCategory({
    commit
  }) {
    axios.get("https://localhost:44301/api/Category/GetProductWithCategory")
      .then((response) => {
        let listCategory = response.data;
        commit('SET_LISTPRODUCTWITHCATEGORY', listCategory);
      }).catch((error) => {
        console.error(error);
      })
  },
}

// mutations
const mutations = {
  SET_LISTCATEGORY(state, listCategory) {
    state.listCategory = listCategory;
  },
  SET_LISTPRODUCTWITHCATEGORY(state, listProductWithCategory) {
    state.listProductWithCategory = listProductWithCategory;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
