import {
  UNAUTH_REQUEST,
  REGISTER_REQUEST,
  LOGIN_REQUEST,
  AUTH_ERROR,
  CLEAR_ERROR,
  LOAD_BOOKS,
  LOAD_DATA_SUCCESS,
  FAILURE
} from './types'

/**
 * Tells the app we want to log out a user
 */
export function logout () {
  return { type: UNAUTH_REQUEST }
}

export function loadBooks () {
  return { type: LOAD_BOOKS }
}

export function failure (error) {
  return {
    type: actionTypes.FAILURE,
    error
  }
}

export function loadDataSuccess (data) {
  return {
    type: LOAD_DATA_SUCCESS,
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
    type: REGISTER_REQUEST,
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
    type: LOGIN_REQUEST,
    data
  }
}

/**
 * Sets the `error` state to the error received
 * @param  {object} error The error we got when trying to make the request
 */
export function requestError (error) {
  return {
    type: AUTH_ERROR,
    error
  }
}

/**
 * Sets the `error` state as empty
 */
export function clearError () {
  return { type: CLEAR_ERROR }
}