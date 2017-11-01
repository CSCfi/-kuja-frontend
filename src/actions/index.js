import { API_BASE_URL } from '../helpers/Constants'

export const FETCH_LUVAT = 'fetch_luvat'
export const LOGIN_USER = 'login_user'
export const LOGOUT_USER = 'logout_user'

export function fetchLuvat() {
  const request = fetch(`${API_BASE_URL}/luvat`)

  return (dispatch) => {
    request
      .then((response) => response.json())
      .then((data) => dispatch({ type: FETCH_LUVAT, payload: data }))
  }
}

export function logoutUser() {
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
