import { API_BASE_URL } from '../helpers/Constants'

export const FETCH_LUVAT = 'fetch_luvat'
export const LOGIN_USER = 'login_user'
export const LOGOUT_USER = 'logout_user'
export const TOGGLE_LOGIN = 'toggle_login'
export const ROLE_LOGIN = 'role_login'

export function fetchLuvat() {
  const request = fetch(`${API_BASE_URL}/luvat`)

  return (dispatch) => {
    request
      .then((response) => response.json())
      .then((data) => dispatch({ type: FETCH_LUVAT, payload: data }))
  }
}

export function login() {
  const user = {
    role: 'esittelijä',
    firstName: 'Essi',
    lastName: 'Esittelijä'
  }

  return {
    type: LOGIN_USER,
    payload: user
  }
}

export function logout() {
  return {
    type: LOGOUT_USER,
    payload: null
  }
}

export function loginUser(values) {
  return {
    type: LOGIN_USER,
    payload: values
  }
}

export function toggleLogin() {
  return { type: TOGGLE_LOGIN, payload: {} }
}
