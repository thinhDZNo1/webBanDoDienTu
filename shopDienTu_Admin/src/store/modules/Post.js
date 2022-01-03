import axios from 'axios'
import store from '..'

const state = () => ({
  listPost: [],
})

// getters
const getters = {
  listPost: state => {
    return state.listPost
  },
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
  AddPost({}, Post) {
    axios.post('https://localhost:44301/api/Post/InsertPost', Post)
      .then((response) => {
        store.dispatch('Post/GetAllPost');
      })
      .catch((error) => {
        console.log(error)
      })
  },
  UpdatePost({}, {
    Post
  }) {
    axios.put("https://localhost:44301/api/Post/UpdatePost", Post)
      .then((response) => {
        store.dispatch('Post/GetAllPost');
      })
      .catch((error) => {
        console.log(error)
      })
  },
  DeletePost({}, id){
    axios.delete("https://localhost:44301/api/Post/DeletePost?id=" + id)
      .then((response) => {
        store.dispatch('Post/GetAllPost')
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

// mutations
const mutations = {
  SET_LISTPOST(state, listPost) {
    state.listPost = listPost;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
