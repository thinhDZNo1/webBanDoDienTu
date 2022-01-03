import axios from 'axios'

const state = () => ({
  listSlide: [],
})

// getters
const getters = {
  listSlide: state => {
    return state.listSlide
  },
}

// actions
const actions = {
  GetAllSlide({
    commit
  }) {
    axios.get("https://localhost:44301/api/Slide/GetAll")
      .then((response) => {
        let listSlide = response.data;
        commit('SET_LISTSLIDE', listSlide);
      }).catch((error) => {
        console.error(error);
      })
  },
}

// mutations
const mutations = {
  SET_LISTSLIDE(state, listSlide) {
    state.listSlide = listSlide;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
