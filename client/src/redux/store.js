import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
// import { persistStore, persistCombineReducers } from 'redux-persist'
// import { CookieStorage } from 'redux-persist-cookie-storage'
// import Cookies from 'cookies-js'

import reducers from './reducers'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }

  return applyMiddleware(...middleware)
}

const configureStore = (state) => {
  const store = createStore(
    reducers,
    state,
    bindMiddleware([sagaMiddleware])
  )

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga)
  }

  store.runSagaTask()
  return store
}

export default configureStore