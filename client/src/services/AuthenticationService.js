import Api from './Api'

// Authentication server is separate from API server due to
// nature of isomorphic apps
// Api.defaults.baseURL = 'http://localhost:3000/'

export default {
  register (credentials) {
    return Api.post('register', credentials)
  },
  login (credentials) {
    return Api.post('login', credentials)
  }
}