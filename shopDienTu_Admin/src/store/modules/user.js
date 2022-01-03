import axios from 'axios'
import store from '..'

const state = () => ({
  listUser: [],
})

// getterss
const getters = {
  listUser: state => {
    return state.listUser
  },
}

// actions
const actions = {
  GetAllUser({
    commit
  }) {
    axios.get("https://localhost:44301/api/User/GetAll")
      .then((response) => {
        let listUser = response.data;
        commit('SET_LISTUSERALL', listUser);
      }).catch((error) => {
        console.error(error);
      })
  },
  AddUser({}, User) {
    axios.post('https://localhost:44301/api/User/Insert', User)
      .then((response) => {
        store.dispatch('User/GetAllUser');
      })
      .catch((error) => {
        console.log(error)
      })
  },

  AddUserC({}, User) {
    axios.post('https://localhost:44301/api/User/Register', User)
      .then((response) => {
        store.dispatch('User/GetAllUser');
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
        store.dispatch('User/GetAllUser');
      })
      .catch((error) => {
        console.log(error)
      })
  },
  DeleteUser({}, id){
    axios.delete("https://localhost:44301/api/User/DeleteUser?id=" + id)
      .then((response) => {
        store.dispatch('User/GetAllUser')
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

// mutations
const mutations = {
  SET_LISTUSERALL(state, listUser) {
    state.listUser = listUser;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
