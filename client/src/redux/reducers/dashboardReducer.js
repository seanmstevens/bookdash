import { 
  LOAD_DATA_SUCCESS,
  LOAD_DATA_FAILURE
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
        ...{ data: action.payload }
      }

    case LOAD_DATA_FAILURE:
      return {
        ...state,
        ...{ error: action.payload }
      }

    default:
      return state
  }
}