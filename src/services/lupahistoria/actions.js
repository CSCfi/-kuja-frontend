import { API_BASE_URL } from 'modules/constants'

import {
  FETCH_HISTORY_START,
  FETCH_HISTORY_SUCCESS,
  FETCH_HISTORY_FAILURE
} from "./actionTypes";

export function fetchLupaHistory(oid) {
  return (dispatch) => {
    dispatch({ type: FETCH_HISTORY_START })

    const request = fetch(`${API_BASE_URL}/luvat/historia/${oid}`)

    request
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: FETCH_HISTORY_SUCCESS, payload: data })
      })
      .catch((err) => dispatch({ type: FETCH_HISTORY_FAILURE, payload: err }))
  }
}