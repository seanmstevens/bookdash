import { 
  SESSION_SUCCESS,
  SESSION_FAILURE,
  CSRF_SUCCESS,
  CSRF_FAILURE
} from '../actions/types'

let initialState = {
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SESSION_SUCCESS:
      return {
        ...state,
        ...action.payload
      }

    case SESSION_FAILURE:
      return {
        ...state,
        ...{ error: action.payload }
      }

    case CSRF_SUCCESS:
      return {
        ...state,
        ...{ csrfToken: action.payload }
      }

    case CSRF_FAILURE:
      return {
        ...state,
        ...{ error: action.payload }
      }

    default:
      return state
  }
}