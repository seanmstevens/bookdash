import qs from 'qs'
import { put, call, select, take, takeLatest, fork, all, cancel, cancelled } from 'redux-saga/effects'
import {
  AUTH_SUCCESS,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  AUTH_ERROR,
  CLEAR_ERROR,
  UNAUTH_REQUEST,
  LOAD_BOOKS,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_FAILURE,
  SESSION_REQUEST,
  SESSION_SUCCESS,
  SESSION_FAILURE,
  CSRF_REQUEST,
  CSRF_SUCCESS,
  CSRF_FAILURE
} from './actions/types'

import Router from 'next/router'
import AuthenticationService from '../services/AuthenticationService'
import BookService from '../services/BookService'

function * watchAndLog () {
  // while (true) {
  //   const action = yield take('*')
  //   const state = yield select()

  //   console.log('action', action)
  //   console.log('state after', state)
  // }
}

function * getSession ({ req = null, force = false } = {}) {
  let session = {}
  if (req) {
    if (req.session) {
      // If running on the server session data should be in the req object
      session.csrfToken = req.connection._httpMessage.locals._csrf
      session.expires = req.session.cookie._expires
      // If the user is logged in, add the user to the session object
      if (req.user) {
        session.user = req.user
      }
    }
  } else {
    // If running in the browser attempt to load session from sessionStore
    if (force === true) {
      // If force update is set, reset data store
      _removeLocalStore('session')
    } else {
      session = _getLocalStore('session')
    }
  }

  
  // If session data exists, has not expired AND force is not set then
  // return the stored session we already have.
  if (session && Object.keys(session).length > 0 && session.expires && session.expires > Date.now()) {
    yield put({ type: SESSION_SUCCESS, payload: session })
    return
  } else {
    // If running on server, but session has expired return empty object
    // (no valid session)
    if (typeof window === 'undefined') {
      yield put({ type: SESSION_SUCCESS, payload: {} })
      return
    }
  }
  
  // If we don't have session data, or it's expired, or force is set
  // to true then revalidate it by fetching it again from the server.
  try {
    const res = yield call(AuthenticationService.session)
    if (res.status !== 200) {
      yield put({ type: SESSION_FAILURE, payload: 'HTTP error when trying to get session' })
    }
    
    session = res.data
    session.expires = Date.now() + session.revalidateAge
    
    _saveLocalStore('session', session)
  } catch (err) {
    yield put({ type: SESSION_FAILURE, payload: 'Unable to get session information' })
  }
}

function * getCsrfToken () {
  try {
    const res = yield call(AuthenticationService.csrf)
    yield put({ type: CSRF_SUCCESS, payload: res.data.csrfToken})
    return res.data.csrfToken
  } catch (err) {
    yield put({ type: CSRF_FAILURE, payload: 'Unable to get CSRF token' })
  }
}

function * loadDataSaga () {
  try {
    const res = yield call(BookService.getBooks)
    yield put({ type: LOAD_DATA_SUCCESS, payload: res.data.data })
  } catch (err) {
    console.log(err)
    yield put({ type: LOAD_DATA_FAILURE, payload: 'Unable to fetch data' })
  }
}

function * authorize ({ name, email, password }, isRegistering) {
  try {
    let response
    const formData = isRegistering ? 
      { name, email, password } :
      { email, password}
    
    formData._csrf = yield call(getCsrfToken)
    const encodedForm = qs.stringify(formData)

    if (isRegistering) {
      response = yield call(AuthenticationService.register, encodedForm)
    } else {
      response = yield call(AuthenticationService.login, encodedForm)
    }

    if (response && response.status && response.status === 200) {
      yield put({ type: AUTH_SUCCESS, payload: response.data })
      yield put({ type: CLEAR_ERROR })
      Router.replace('/')
      // yield call(Api.storeItem, {token})
      return response.data
    }
  } catch(error) {
    console.error(error)
    yield put({ type: AUTH_ERROR, payload: 'Something went wrong while attempting to log in' })
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

function * session () {
  while (true) {
    // We include payload to control for server-side or client-side actions
    const { type, payload } = yield take([SESSION_REQUEST, CSRF_REQUEST])
    const generator = type === SESSION_REQUEST ? getSession : getCsrfToken
    yield fork(generator, payload)
  }
}

const _getLocalStore = name => {
  try {
    return JSON.parse(localStorage.getItem(name))
  } catch (err) {
    return null
  }
}

const _saveLocalStore = (name, data) => {
  try {
    localStorage.setItem(name, JSON.stringify(data))
    return true
  } catch (err) {
    return false
  }
}

const _removeLocalStore = name => {
  try {
    localStorage.removeItem(name)
    return true
  } catch (err) {
    return false
  }
}

function * rootSaga () {
  yield all([
    call(watchAndLog),
    fork(loginFlow),
    fork(session),
    takeLatest(LOAD_BOOKS, loadDataSaga)
  ])
}

export default rootSaga