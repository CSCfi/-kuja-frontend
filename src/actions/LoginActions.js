import axios from 'axios'

import { API_BASE_URL } from 'helpers/Constants'

export const DUMMY_LOGIN_USER = 'DUMMY_LOGIN_USER'
export const DUMMY_LOGOUT_USER = 'DUMMY_LOGOUT_USER'

export const LOGIN_GET_ROLES_START = 'LOGIN_GET_ROLES_START'
export const LOGIN_GET_ROLES_SUCCESS = 'LOGIN_GET_ROLES_SUCCESS'
export const LOGIN_GET_ROLES_FAILURE = 'LOGIN_GET_ROLES_FAILURE'

export function getRoles() {
  return (dispatch) => {
    dispatch({ type: LOGIN_GET_ROLES_START })

    console.log('REQ URL:', `${API_BASE_URL}/auth/me`)
    
    axios.get(`${API_BASE_URL}/auth/me`, { withCredentials: true })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    /*
    const request = fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      
      // withCredentials: true
      // headers: {
      //   'Cookie': '')
      // }, 
    })
    

    request
      .then((response) => response.json())
      .then((data) => dispatch({ type: LOGIN_GET_ROLES_SUCCESS, payload: data }))
      .catch((err) => dispatch({ type: LOGIN_GET_ROLES_FAILURE, payload: err }))
    */
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
