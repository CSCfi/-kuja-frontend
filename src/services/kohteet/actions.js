import { API_BASE_URL } from "../../modules/constants";

import {
  FETCH_KOHTEET_START,
  FETCH_KOHTEET_SUCCESS,
  FETCH_KOHTEET_FAILURE
} from "./actionTypes";

export function fetchKohteet() {
  return dispatch => {
    dispatch({ type: FETCH_KOHTEET_START });

    const request = fetch(`${API_BASE_URL}/kohteet`);

    request
      .then(response => response.json())
      .then(data => {
        dispatch({ type: FETCH_KOHTEET_SUCCESS, payload: data });
      })
      .catch(err => {
        dispatch({ type: FETCH_KOHTEET_FAILURE, payload: err });
      });
  };
}
