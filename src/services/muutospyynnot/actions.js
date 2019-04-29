import _ from "lodash";
import { API_BASE_URL } from "modules/constants";
import { GET_MUUTOSPERUSTELU_BY_KOODIARVO } from "../perustelut/actionTypes";
import {
  FETCH_MUUTOSPYYNNOT_START,
  FETCH_MUUTOSPYYNNOT_SUCCESS,
  FETCH_MUUTOSPYYNNOT_FAILURE
} from "./actionTypes";

export function fetchMuutospyynnot(ytunnus, query) {
  return (dispatch) => {
    dispatch({ type: FETCH_MUUTOSPYYNNOT_START })

    const request = fetch(`${API_BASE_URL}/muutospyynnot/${ytunnus}${query ? query : ''}`)

    request
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: FETCH_MUUTOSPYYNNOT_SUCCESS, payload: data })
      })
      .catch((err) => dispatch({ type: FETCH_MUUTOSPYYNNOT_FAILURE, payload: err }))
  }
}

export function getMuutosperusteluByKoodiArvo(koodiarvo) {
  return dispatch => {
    dispatch({ type: GET_MUUTOSPERUSTELU_BY_KOODIARVO });
  };
}