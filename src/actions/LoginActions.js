import axios from 'axios'

import { API_BASE_URL } from 'helpers/Constants'

export const DUMMY_LOGIN_USER = 'DUMMY_LOGIN_USER'
export const DUMMY_LOGOUT_USER = 'DUMMY_LOGOUT_USER'

export const LOGIN_GET_ROLES_START = 'LOGIN_GET_ROLES_START'
export const LOGIN_GET_ROLES_SUCCESS = 'LOGIN_GET_ROLES_SUCCESS'
export const LOGIN_GET_ROLES_FAILURE = 'LOGIN_GET_ROLES_FAILURE'
export const LOGOUT_USER_START = 'LOGOUT_USER_START'
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS'
export const LOGOUT_USER_FAILURE = 'LOGOUT_USER_FAILURE'

export function getRoles() {
  return (dispatch) => {
    dispatch({ type: LOGIN_GET_ROLES_START })
    
    axios.get(`${API_BASE_URL}/auth/me`, { withCredentials: true })
      .then((response) => {
        dispatch({ type: LOGIN_GET_ROLES_SUCCESS, payload: response.data })
      })
      .catch((err) => dispatch({ type: LOGIN_GET_ROLES_FAILURE, payload: err }))
      
  }
}

export function logoutUser() {
  return (dispatch) => {
    dispatch({ type: LOGOUT_USER_START })
  }
}

export function dummyLogoutUser() {
  return {
    type: DUMMY_LOGOUT_USER,
    payload: null
  }
}

export function dummyLoginUser(values) {
  return {
    type: DUMMY_LOGIN_USER,
    payload: values
  }
}
