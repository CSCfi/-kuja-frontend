import { API_BASE_URL } from "modules/constants";
import {
  FETCH_MUUT_START,
  FETCH_MUUT_SUCCESS,
  FETCH_MUUT_FAILURE
} from "./actionTypes";

export function fetchMuut() {
  return (dispatch) => {
    dispatch({ type: FETCH_MUUT_START })

    const request = fetch(`${API_BASE_URL}/koodistot/koodit/oivamuutoikeudetvelvollisuudetehdotjatehtavat`)

    request
      .then(response => response.json())
      .then(data => { dispatch({ type: FETCH_MUUT_SUCCESS, payload: data }) })
      .catch(err => { dispatch({ type: FETCH_MUUT_FAILURE, payload: err }) })
  }
}
