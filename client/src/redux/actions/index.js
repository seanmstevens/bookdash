import { actionTypes } from './types'

export function logout () {
  return { type: actionTypes.UNAUTH_REQUEST }
}

export function loadBooks () {
  return { type: actionTypes.LOAD_BOOKS }
}

export function openModal () {
  return { type: actionTypes.MODAL_OPENED }
}

export function closeModal () {
  return { type: actionTypes.MODAL_CLOSED }
}

export function retrieveSession (req, force) {
  return { type: actionTypes.SESSION_REQUEST, payload: { req, force } }
}

export function getCsrfToken () {
  return { type: actionTypes.CSRF_REQUEST }
}

export function loadDataSuccess (data) {
  return {
    type: actionTypes.LOAD_DATA_SUCCESS,
    data
  }
}

/**
 * Tells the app we want to register a user
 * @param  {object} data The data we're sending for registration
 * @param  {string} data.name The name of the user to register
 * @param  {string} data.email The email of the user to register
 * @param  {string} data.password The password of the user to register
 */
export function registerUser (data) {
  return {
    type: actionTypes.REGISTER_REQUEST,
    data
  }
}

/**
 * Tells the app we want to log in a user
 * @param  {object} data          The data we're sending for log in
 * @param  {string} data.email The username of the user to log in
 * @param  {string} data.password The password of the user to log in
 */
export function loginUser (data) {
  return {
    type: actionTypes.LOGIN_REQUEST,
    data
  }
}

/**
 * Sets the `error` state to the error received
 * @param  {object} error The error we got when trying to make the request
 */
export function requestError (error) {
  return {
    type: actionTypes.AUTH_ERROR,
    error
  }
}

/**
 * Sets the `error` state as empty
 */
export function clearError () {
  return { type: actionTypes.CLEAR_ERROR }
}