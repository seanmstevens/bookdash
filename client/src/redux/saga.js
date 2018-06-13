import { put, call, select, take, fork, all, cancel, cancelled } from 'redux-saga/effects'
import {
  AUTH_SUCCESS,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  AUTH_ERROR,
  CLEAR_ERROR,
  UNAUTH_REQUEST
} from './actions/types'
import Router from 'next/router'
import AuthenticationService from '../services/AuthenticationService'

function * watchAndLog () {
  while (true) {
    const action = yield take('*')
    const state = yield select()

    console.log('action', action)
    console.log('state after', state)
  }
}

function * authorize ({ name, email, password }, isRegistering) {
  try {
    let response
    
    if (isRegistering) {
      response = yield call(AuthenticationService.register, { name, email, password })
    } else {
      response = yield call(AuthenticationService.login, { email, password })
    }

    yield put({ type: AUTH_SUCCESS, payload: response.data })
    yield put({ type: CLEAR_ERROR })
    Router.replace('/')
    // yield call(Api.storeItem, {token})
    return response.data
  } catch(error) {
    yield put({ type: AUTH_ERROR, payload: 'Something went wrong while attempting to log in.' })
  } finally {
    if (yield cancelled()) {
      console.log('Login cancelled')
      // ... put special cancellation handling code here
    }
  }
}

function * loginFlow () {
  while (true) {
    const request = yield take([LOGIN_REQUEST, REGISTER_REQUEST])
    const isRegistering = request.type === REGISTER_REQUEST ? true : false
    // fork return a Task object

    const task = yield fork(authorize, request.data, isRegistering)
    const action = yield take([UNAUTH_REQUEST, AUTH_ERROR])

    if (action.type === UNAUTH_REQUEST)
      yield cancel(task)
      
    // yield call(Api.clearItem, 'token')
  }
}

function * rootSaga () {
  yield all([
    call(watchAndLog),
    fork(loginFlow)
  ])
}

export default rootSaga