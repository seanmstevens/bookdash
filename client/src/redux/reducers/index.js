import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import authReducer from './authReducer'
import dashboardReducer from './dashboardReducer'
import sessionReducer from './sessionReducer'

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  session: sessionReducer,
  dashboard: dashboardReducer
})

export default rootReducer