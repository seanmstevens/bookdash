import { 
  AUTH_SUCCESS,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  AUTH_ERROR,
  CLEAR_ERROR
} from '../actions/types'

// The initial application state
let initialState = {
  error: '',
  loginPending: false,
  loggedIn: false,
  token: null,
  user: {
    name: null,
    email: null
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      const { token, user: { name, email } } = action.payload
      return {
        ...state,
        loggedIn: true,
        loginPending: false,
        token,
        user: {
          name,
          email
        }
      }

    case LOGIN_REQUEST:
      return {
        ...state,
        loginPending: true
      }
      
    case REGISTER_REQUEST:
      return {
        ...state,
        loginPending: true
      }

    case AUTH_ERROR:
      return {
        ...state,
        loginPending: false,
        error: action.payload
      }

    case CLEAR_ERROR:
      return {
        ...state,
        error: ''
    }

    default:
      return state
  }
}