import axios from 'axios'
import store from '..'

const state = () => ({
  listCategory: [],
})

// getters
const getters = {
  listCategory: state => {
    return state.listCategory
  },
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
  AddCategory({}, category) {
    axios.post('https://localhost:44301/api/Category/InsertCategory', category)
      .then((response) => {
        store.dispatch('Category/GetAllCategory');
      })
      .catch((error) => {
        console.log(error)
      })
  },
  UpdateCategory({}, {
    category
  }) {
    axios.put("https://localhost:44301/api/Category/UpdateCategory", category)
      .then((response) => {
        store.dispatch('Category/GetAllCategory');
      })
      .catch((error) => {
        console.log(error)
      })
  },
  DeleteCategory({}, id){
    axios.delete("https://localhost:44301/api/Category/DeleteCategory?id=" + id)
      .then((response) => {
        store.dispatch('Category/GetAllCategory')
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

// mutations
const mutations = {
  SET_LISTCATEGORY(state, listCategory) {
    state.listCategory = listCategory;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
