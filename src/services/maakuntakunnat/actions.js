import { API_BASE_URL } from "../../modules/constants"

import {
  FETCH_MAAKUNTAKUNNAT_START,
  FETCH_MAAKUNTAKUNNAT_SUCCESS,
  FETCH_MAAKUNTAKUNNAT_FAILURE
} from "./actionTypes";

export function fetchMaakuntakunnat() {
  return (dispatch) => {
    dispatch({ type: FETCH_MAAKUNTAKUNNAT_START })

    const request = fetch(`${API_BASE_URL}/koodistot/maakuntakunta`)

    request
      .then(response => response.json())
      .then(data => { dispatch({ type: FETCH_MAAKUNTAKUNNAT_SUCCESS, payload: data }) })
      .catch(err => { dispatch({ type: FETCH_MAAKUNTAKUNNAT_FAILURE, payload: err }) })
  }
}