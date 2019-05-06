import { API_BASE_URL } from "../../modules/constants"

import {
  FETCH_KOULUTUSALAT_START,
  FETCH_KOULUTUSALAT_SUCCESS,
  FETCH_KOULUTUSALAT_FAILURE
} from "./actionTypes";

export function fetchKoulutusalat() {
  return dispatch => {
    dispatch({ type: FETCH_KOULUTUSALAT_START });

    const request = fetch(`${API_BASE_URL}/koodistot/koulutusalat/`);

    return request
      .then(response => response.json())
      .then(data => {
        dispatch({ type: FETCH_KOULUTUSALAT_SUCCESS, payload: data });
      })
      .catch(err =>
        dispatch({ type: FETCH_KOULUTUSALAT_FAILURE, payload: err })
      );
  };
}
