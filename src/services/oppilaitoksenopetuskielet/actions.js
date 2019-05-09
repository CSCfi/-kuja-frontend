import { API_BASE_URL } from "../../modules/constants";

import {
  FETCH_OPPILAITOKSENOPETUSKIELET_START,
  FETCH_OPPILAITOKSENOPETUSKIELET_SUCCESS,
  FETCH_OPPILAITOKSENOPETUSKIELET_FAILURE
} from "./actionTypes";

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
