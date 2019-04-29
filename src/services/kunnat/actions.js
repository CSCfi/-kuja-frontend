import { API_BASE_URL } from "modules/constants";
import {
  FETCH_KUNNAT_START,
  FETCH_KUNNAT_SUCCESS,
  FETCH_KUNNAT_FAILURE
} from "./actionTypes";

export function fetchKunnat() {
  return dispatch => {
    dispatch({ type: FETCH_KUNNAT_START });

    const request = fetch(`${API_BASE_URL}/koodistot/kunnat`);

    request
      .then(response => response.json())
      .then(data => {
        dispatch({ type: FETCH_KUNNAT_SUCCESS, payload: data });
      })
      .catch(err => {
        dispatch({ type: FETCH_KUNNAT_FAILURE, payload: err });
      });
  };
}
