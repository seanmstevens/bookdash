import { 
  LOAD_DATA_SUCCESS,
  FAILURE
} from '../actions/types'

// The initial application state
let initialState = {
  data: null,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DATA_SUCCESS:
      return {
        ...state,
        ...{ data: action.data }
      }

    case FAILURE:
      return {
        ...state,
        ...{ error: action.error }
      }

    default:
      return state
  }
}