import { API_BASE_URL } from "modules/constants";

import {
  FETCH_LUPA_START,
  FETCH_LUPA_SUCCESS,
  FETCH_LUPA_FAILURE
} from "./actionTypes";

export function fetchLupa(ytunnus, query = "", formatMessage) {
  return dispatch => {
    dispatch({ type: FETCH_LUPA_START });

    const request = fetch(
      `${API_BASE_URL}/luvat/jarjestaja/${ytunnus}${query}`
    );

    request
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: FETCH_LUPA_SUCCESS,
          payload: { data, formatMessage }
        });
      })
      .catch(err => dispatch({ type: FETCH_LUPA_FAILURE, payload: err }));
  };
}
