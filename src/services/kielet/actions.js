import { API_BASE_URL } from "../../modules/constants";

import {
  FETCH_KIELET_START,
  FETCH_KIELET_SUCCESS,
  FETCH_KIELET_FAILURE,
  FETCH_OPPILAITOKSENOPETUSKIELET_START,
  FETCH_OPPILAITOKSENOPETUSKIELET_SUCCESS,
  FETCH_OPPILAITOKSENOPETUSKIELET_FAILURE
} from "./actionTypes";

export function fetchKielet() {
  return (dispatch) => {
    dispatch({ type: FETCH_KIELET_START })

    const request = fetch(`${API_BASE_URL}/koodistot/kielet`)

    request
      .then(response => response.json())
      .then(data => dispatch({ type: FETCH_KIELET_SUCCESS, payload: data }))
      .catch(err => dispatch({ type: FETCH_KIELET_FAILURE, payload: err }))
  }
}

export function fetchOppilaitoksenOpetuskielet() {
  return dispatch => {
    dispatch({ type: FETCH_OPPILAITOKSENOPETUSKIELET_START });

    const request = fetch(`${API_BASE_URL}/koodistot/opetuskielet`);

    request
      .then(response => response.json())
      .then(data =>
        dispatch({
          type: FETCH_OPPILAITOKSENOPETUSKIELET_SUCCESS,
          payload: data
        })
      )
      .catch(err =>
        dispatch({
          type: FETCH_OPPILAITOKSENOPETUSKIELET_FAILURE,
          payload: err
        })
      );
  };
}
