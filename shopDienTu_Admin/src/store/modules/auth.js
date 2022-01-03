import axios from "axios";
import store from '..'

const state = () => ({
  authenticated: false,
  user: null,
})

// getters
const getters = {
  user: state => {
    return state.user
  },
  authenticated: state =>{
    return state.authenticated
  }
}
// actions
const actions = {
  changeType({commit}){
    let authenticated = true;
    commit('SET_AUTHENTICATED', authenticated);
  },
  async authenticate({commit}, {username, password}) {
    axios.get("https://localhost:44301/api/User/LoginAdmin?username="+username+"&password="+password)
    .then((response) => {
      let user = response.data;
      store.dispatch('auth/changeType');
      commit('SET_USER', user);
    }).catch((error) => {
      console.error(error);
    })
  }
}

// mutations
const mutations = {
  SET_AUTHENTICATED(state, authenticated) {
    state.authenticated = authenticated;
  },
  SET_USER(state, user) {
    state.user = user;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
