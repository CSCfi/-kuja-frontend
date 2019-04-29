import { API_BASE_URL } from "modules/constants";
import {
  FETCH_LUVAT_START,
  FETCH_LUVAT_SUCCESS,
  FETCH_LUVAT_FAILURE
} from "./actionTypes";

export function fetchLuvat() {
  return dispatch => {
    dispatch({ type: FETCH_LUVAT_START });

    const request = fetch(`${API_BASE_URL}/luvat/jarjestajilla`);

    request
      .then(response => response.json())
      .then(data => {
        dispatch({ type: FETCH_LUVAT_SUCCESS, payload: data });
      })
      .catch(err => dispatch({ type: FETCH_LUVAT_FAILURE, payload: err }));
  };
}
