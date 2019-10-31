import { API_BASE_URL } from "modules/constants";
import {
  FETCH_LUVAT_START,
  FETCH_LUVAT_SUCCESS,
  FETCH_LUVAT_FAILURE
} from "./actionTypes";

export const fetchLuvat = (dispatch, signal) => {
  // dispatch({ type: FETCH_LUVAT_START });
  console.info(dispatch, signal);
  return fetch(`${API_BASE_URL}/luvat/jarjestajilla`, {
    signal: signal
  })
    .then(response => response.json())
    .then(data => {
      return dispatch({ type: FETCH_LUVAT_SUCCESS, payload: data });
    })
    .catch(err => {
      if (signal.aborted) {
        console.info("Request has been gracefully cancelled.");
      } else {
        dispatch({ type: FETCH_LUVAT_FAILURE, payload: { err, signal } });
      }
    });
};
