import { API_BASE_URL } from "modules/constants";
import {
  FETCH_OPISKELIJAVUODET_START,
  FETCH_OPISKELIJAVUODET_SUCCESS,
  FETCH_OPISKELIJAVUODET_FAILURE
} from "./actionTypes";

export function fetchMuut() {
  return (dispatch) => {
    dispatch({ type: FETCH_OPISKELIJAVUODET_START })

    const request = fetch(`${API_BASE_URL}/koodistot/koodit/oivamuutoikeudetvelvollisuudetehdotjatehtavat`)

    request
      .then(response => response.json())
      .then(data => { dispatch({ type: FETCH_OPISKELIJAVUODET_SUCCESS, payload: data }) })
      .catch(err => { dispatch({ type: FETCH_OPISKELIJAVUODET_FAILURE, payload: err }) })
  }
}
