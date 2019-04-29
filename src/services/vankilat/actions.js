import { API_BASE_URL } from "modules/constants";
import {
  FETCH_VANKILAT_START,
  FETCH_VANKILAT_SUCCESS,
  GET_VANKILAT,
  FETCH_VANKILAT_FAILURE
} from "./actionTypes";

export function fetchVankilat() {
  return dispatch => {
    dispatch({ type: FETCH_VANKILAT_START });

    const request = fetch(`${API_BASE_URL}/koodistot/koodit/vankilat`);

    request
      .then(response => response.json())
      .then(data => {
        dispatch({ type: FETCH_VANKILAT_SUCCESS, payload: data });
      })
      .catch(err => dispatch({ type: FETCH_VANKILAT_FAILURE, payload: err }));
  };
}

export function getVankilat() {
  return dispatch => {
    dispatch({ type: GET_VANKILAT });
  };
}
