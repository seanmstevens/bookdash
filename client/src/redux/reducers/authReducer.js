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
  user: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      const { user } = action.payload
      return {
        ...state,
        user,
        loggedIn: true,
        loginPending: false
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