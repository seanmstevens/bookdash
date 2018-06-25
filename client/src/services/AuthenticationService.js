import Api from './Api'

const authApi = Api()
authApi.defaults.baseURL = 'http://localhost:3000/auth'

export default {
  register (credentials) {
    return authApi.post('/register', credentials, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest' // So Express can detect AJAX post
      }
    })
  },
  login (credentials) {
    return authApi.post('/login', credentials, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest' // So Express can detect AJAX post
      }
    })
  },
  session () {
    return authApi.get('/session')
  },
  csrf () {
    return authApi.get('/csrf')
  }
}