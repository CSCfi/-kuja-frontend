import { API_BASE_URL } from "../../modules/constants"
import {
  FETCH_PAATOSKIERROKSET_START,
  FETCH_PAATOSKIERROKSET_SUCCESS,
  FETCH_PAATOSKIERROKSET_FAILURE
} from "./actionTypes";

export function fetchPaatoskierrokset() {
  return (dispatch) => {
    dispatch({ type: FETCH_PAATOSKIERROKSET_START })

    const request = fetch(`${API_BASE_URL}/paatoskierrokset/open`)

    request
      .then(response => response.json())
      .then(data => {
        dispatch({ type: FETCH_PAATOSKIERROKSET_SUCCESS, payload: data })
      })
      .catch(err => dispatch({ type: FETCH_PAATOSKIERROKSET_FAILURE, payload: err }))
  }
}