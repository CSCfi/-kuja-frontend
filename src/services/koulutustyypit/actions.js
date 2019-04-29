import { API_BASE_URL } from "modules/constants";

import {
    FETCH_KOULUTUSTYYPIT_START,
    FETCH_KOULUTUSTYYPIT_SUCCESS,
    FETCH_KOULUTUSTYYPIT_FAILURE
  } from "./actionTypes";

export function fetchKoulutustyypit() {
    return (dispatch) => {
      dispatch({ type: FETCH_KOULUTUSTYYPIT_START })
  
      const request = fetch(`${API_BASE_URL}/koodistot/koulutustyypit/`)
  
      return request
        .then(response => response.json())
        .then(data => {
          dispatch({ type: FETCH_KOULUTUSTYYPIT_SUCCESS, payload: data })
        })
        .catch(err => dispatch({ type: FETCH_KOULUTUSTYYPIT_FAILURE, payload: err }))
    }
  }