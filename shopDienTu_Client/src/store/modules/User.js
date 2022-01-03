import axios from 'axios'

const state = () => ({
  user: null,
  check: true,
})

// getters
const getters = {
  user: state =>{
    return state.user
  },
  check: state =>{
    return state.check
  }
}

// actions
const actions = {
  Login({
    commit
  }, {username, password}) {
      axios.get("https://localhost:44301/api/User/LoginCustomer?username="+username+"&password="+password)
      .then((response) => {
        let user = response.data;
        commit('SET_USER', user);
      }).catch((error) => {
        console.error(error);
      })
  },

  AddUser({commit}, User) {
    axios.post('https://localhost:44301/api/User/Register', User)
      .then((response) => {
        commit('SET_USER', null);
        commit('SET_CHECK', true);
      })
      .catch((error) => {
        console.log(error)
      })
  },
  UpdateUser({}, {
    user
  }) {
    axios.put("https://localhost:44301/api/User/UpdateUser", user)
      .then((response) => {
        commit('SET_USER', user);
      })
      .catch((error) => {
        console.log(error)
      })
  },

}

// mutations
const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_CHECK(state, check) {
    state.check = check;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
