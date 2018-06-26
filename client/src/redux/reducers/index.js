import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import authReducer from './authReducer'
import dashboardReducer from './dashboardReducer'
import sessionReducer from './sessionReducer'
import authModalsReducer from './authModalsReducer'

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  authModals: authModalsReducer,
  session: sessionReducer,
  dashboard: dashboardReducer,
})

export default rootReducer