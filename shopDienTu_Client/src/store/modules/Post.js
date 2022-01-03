import axios from 'axios'

const state = () => ({
  listPost: [],
  post: null
})

// getters
const getters = {
  listPost: state => {
    return state.listPost
  },
  post: state => {
    return state.post
  }
}

// actions
const actions = {
  GetAllPost({
    commit
  }) {
    axios.get("https://localhost:44301/api/Post/GetAll")
      .then((response) => {
        let listPost = response.data;
        commit('SET_LISTPOST', listPost);
      }).catch((error) => {
        console.error(error);
      })
  },
  GetPost({
    commit
  }, postId) {
    axios.get("https://localhost:44301/api/Post/GetPost?id=" + postId)
      .then((response) => {
        let post = response.data;
        commit('SET_POST', post);
      }).catch((error) => {
        console.error(error);
      })
  },
}

// mutations
const mutations = {
  SET_LISTPOST(state, listPost) {
    state.listPost = listPost;
  },
  SET_POST(state, post) {
    state.post = post;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
