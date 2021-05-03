import Repository from './Repository';

const user_login = 'auth/login';
const create_user = 'create_user';
const verify = 'auth/verify'

export default {
    // Login Request
  authenticateUser(payload) {
    return Repository.post(`${user_login}`, payload);
  },

  // Create New User
  createUser(payload) {
    return Repository.post(`${create_user}`, payload);
  },

  // Verify User
  verifyUser(payload) {
    return Repository.post(`${verify}`, payload)
  }
}