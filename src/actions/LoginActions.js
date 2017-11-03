export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGIN_USER'

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
