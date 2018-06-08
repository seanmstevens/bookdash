import { put, call, select, take, all } from 'redux-saga/effects'
// import AuthenticationService from '../../services/AuthenticationService'

function * watchAndLog () {
  // while (true) {
  //   const action = yield take('*')
  //   const state = yield select()

  //   console.log('action', action)
  //   console.log('state after', state)
  // }
}

function * rootSaga () {
  yield all([
    call(watchAndLog)
  ])
}

export default rootSaga