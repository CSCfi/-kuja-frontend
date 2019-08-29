import { API_BASE_URL } from "../../modules/constants";
import {
  FETCH_MUUTOSPERUSTELUT_START,
  FETCH_MUUTOSPERUSTELUT_SUCCESS,
  FETCH_MUUTOSPERUSTELUT_FAILURE
} from "./actionTypes";

export function fetchMuutosperustelut() {
  return dispatch => {
    dispatch({ type: FETCH_MUUTOSPERUSTELUT_START });

    const request = fetch(`${API_BASE_URL}/koodistot/koodit/oivaperustelut`);

    request
      .then(response => response.json())
      .then(data => {
        dispatch({ type: FETCH_MUUTOSPERUSTELUT_SUCCESS, payload: data });
      })
      .catch(err =>
        dispatch({ type: FETCH_MUUTOSPERUSTELUT_FAILURE, payload: err })
      );
  };
}
