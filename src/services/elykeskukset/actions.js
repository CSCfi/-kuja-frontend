import { API_BASE_URL } from "../../modules/constants"
import {
  FETCH_ELYKESKUKSET_START,
  FETCH_ELYKESKUKSET_SUCCESS,
  FETCH_ELYKESKUKSET_FAILURE
} from "./actionTypes";

export function fetchELYkeskukset() {
  return (dispatch) => {
    dispatch({ type: FETCH_ELYKESKUKSET_START })

    const request = fetch(`${API_BASE_URL}/koodistot/koodit/elykeskukset`)

    request
      .then(response => response.json())
      .then(data => {
        dispatch({ type: FETCH_ELYKESKUKSET_SUCCESS, payload: data })
      })
      .catch(err => dispatch({ type: FETCH_ELYKESKUKSET_FAILURE, payload: err }))
  }
}