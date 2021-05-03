import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/User'
import Todo from './modules/Todo'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    toast: {
      show: false,
      message: null,
      color: null,
    },
    isTokenExpired: null,
  },
  getters: {
    getToast: (state) => state.toast,
    getLogoutUser: (state) => state.isTokenExpired,
  },
  mutations: {
    setToast: (state, payload) => (state.toast = payload),
    logoutUser: (state, payload) => {
      state.isTokenExpired = payload;
    },
  },
  modules: {
    User,
    Todo
  }
})
