import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import authReducer from './authReducer'
import dashboardReducer from './dashboardReducer'

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  dashboard: dashboardReducer
})

export default rootReducer