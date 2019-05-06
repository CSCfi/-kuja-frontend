import { API_BASE_URL } from "../../modules/constants"
import {
  FETCH_MAARAYSTYYPIT_START,
  FETCH_MAARAYSTYYPIT_SUCCESS,
  FETCH_MAARAYSTYYPIT_FAILURE
} from "./actionTypes";

export function fetchMaaraystyypit() {
  return dispatch => {
    dispatch({ type: FETCH_MAARAYSTYYPIT_START });

    const request = fetch(`${API_BASE_URL}/maaraykset/maaraystyypit`);

    request
      .then(response => response.json())
      .then(data => {
        dispatch({ type: FETCH_MAARAYSTYYPIT_SUCCESS, payload: data });
      })
      .catch(err => {
        dispatch({ type: FETCH_MAARAYSTYYPIT_FAILURE, payload: err });
      });
  };
}
