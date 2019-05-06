import { API_BASE_URL } from "modules/constants";

import {
  FETCH_KOULUTUKSET_ALL_START,
  FETCH_KOULUTUKSET_ALL_SUCCESS,
  FETCH_KOULUTUKSET_ALL_FAILURE,
  FETCH_KOULUTUKSET_MUUT_START,
  FETCH_KOULUTUKSET_MUUT_SUCCESS,
  FETCH_KOULUTUKSET_MUUT_FAILURE,
  FETCH_KOULUTUS_START,
  FETCH_KOULUTUS_SUCCESS,
  FETCH_KOULUTUS_FAILURE
} from "./actionTypes";

export function fetchKoulutuksetAll(koulutusalat, koulutustyypit) {
  return dispatch => {
    dispatch({ type: FETCH_KOULUTUKSET_ALL_START });

    const request = fetch(`${API_BASE_URL}/koodistot/ammatillinen/tutkinnot`);

    request
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: FETCH_KOULUTUKSET_ALL_SUCCESS,
          payload: {
            data,
            koulutusalat,
            koulutustyypit
          }
        });
      })
      .catch(err =>
        dispatch({ type: FETCH_KOULUTUKSET_ALL_FAILURE, payload: err })
      );
  };
}

export function fetchKoulutuksetMuut(koodisto) {
  return dispatch => {
    dispatch({ type: FETCH_KOULUTUKSET_MUUT_START });

    const request = fetch(`${API_BASE_URL}/koodistot/koodit/${koodisto}`);

    request
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: FETCH_KOULUTUKSET_MUUT_SUCCESS,
          payload: data,
          koodisto: koodisto
        });
      })
      .catch(err =>
        dispatch({ type: FETCH_KOULUTUKSET_MUUT_FAILURE, payload: err })
      );
  };
}

export function fetchKoulutus(koodi) {
  return dispatch => {
    dispatch({ type: FETCH_KOULUTUS_START });

    const request = fetch(`${API_BASE_URL}/koodistot/koodi/koulutus/${koodi}`);

    request
      .then(response => response.json())
      .then(data => {
        dispatch({ type: FETCH_KOULUTUS_SUCCESS, payload: data, koodi: koodi });
      })
      .catch(err => dispatch({ type: FETCH_KOULUTUS_FAILURE, payload: err }));
  };
}
