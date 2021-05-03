import Repository from '@/Repository/Repository'
import { RepositoryFactory } from '@/Repository/RepositoryFactory'
const UserRepository = RepositoryFactory.get('user_repository')

const state = {
  user: null
}

const getters = {
  getUser: state => state.user
}

const actions = {
  // Register User
  async registerUser({commit}, payload) {
    try {
      let resp = await UserRepository.createUser(payload);
      if (resp.status == 200 && resp.data.success) {
        commit('setToast', {
          message: 'Your account has been created.',
          color: 'success',
          show: true,
        });
        return 1;
      }
    } catch (err) {
      commit('setToast', {
        message: err.response.data.message,
        color: 'red',
        show: true,
      });
      return 0;
    }
  },

  // Login User
  async loginUser({commit}, payload) {
    try {
      let resp = await UserRepository.authenticateUser(payload);
      console.log(resp)
      if (resp.status == 200 && resp.data.success) {
        commit('setUser', resp.data);
        commit('setToast', {
          message: resp.data.message,
          color: 'success',
          show: true,
        });
        return 1;
      }
    } catch (err) {
      commit('setToast', {
        message: err.response.data.message ? err.response.data.message : err.message,
        color: 'red',
        show: true,
      });
      return 0;
    }
  },

  // Verify User
  async verifyUser({commit}, payload) {
    try {
      let resp = await UserRepository.verifyUser(payload);
      console.log(resp)
      if (resp.status == 200 && resp.data.success) {
        commit('setToast', {
          message: resp.data.message,
          color: 'success',
          show: true,
        });
        return 1;
      }
    } catch (err) {
      commit('setToast', {
        message: err.response.data.message ? err.response.data.message : err.message,
        color: 'red',
        show: true,
      });
      return 0;
    }
  },
}

const mutations = {
  setUser: (state, payload) => {
    let user = payload.user;
    user.token = payload.token;
    state.user = user;
    Repository.defaults.headers.Authorization = `Bearer ${payload.token}`;
    localStorage.setItem('todoUser', JSON.stringify(user));
  },
}

export default {
    state,
    getters,
    actions,
    mutations
}