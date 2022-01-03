import axios from 'axios'
import store from '..'

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
  AddSlide({}, slide) {
    axios.post('https://localhost:44301/api/Slide/InsertSlide', slide)
      .then((response) => {
        store.dispatch('Slide/GetAllSlide');
      })
      .catch((error) => {
        console.log(error)
      })
  },
  UpdateSlide({}, {
    slide
  }) {
    axios.put("https://localhost:44301/api/Slide/UpdateSlide", slide)
      .then((response) => {
        store.dispatch('Slide/GetAllSlide');
      })
      .catch((error) => {
        console.log(error)
      })
  },
  DeleteSlide({}, id){
    axios.delete("https://localhost:44301/api/Slide/DeleteSlide?id=" + id)
      .then((response) => {
        store.dispatch('Slide/GetAllSlide')
      })
      .catch((error) => {
        console.log(error)
      })
  }
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
