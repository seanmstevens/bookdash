import { actionTypes } from '../actions/types'

// The initial application state
let initialState = {
  error: '',
  loginPending: false,
  loggedIn: false,
  user: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      const { user } = action.payload
      return {
        ...state,
        user,
        loggedIn: true,
        loginPending: false
      }

    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        loginPending: true
      }
      
    case actionTypes.REGISTER_REQUEST:
      return {
        ...state,
        loginPending: true
      }

    case actionTypes.AUTH_ERROR:
      return {
        ...state,
        loginPending: false,
        error: action.payload
      }

    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: ''
    }

    default:
      return state
  }
}