import axios from "axios/index";
import { API_BASE_URL } from "../../modules/constants";

import {
  SAVE_MUUTOSPYYNTO_START,
  SAVE_MUUTOSPYYNTO_SUCCESS,
  SAVE_MUUTOSPYYNTO_FAILURE,
  SET_SECTION_DATA
} from "./actionTypes";

export const setSectionData = payload => {
  return dispatch => {
    dispatch({
      type: SET_SECTION_DATA,
      payload
    });
  };
};

export function saveMuutospyynto(muutospyynto) {
  // const attachments = getAttachments(muutospyynto);
  // const formatted = formatMuutospyynto(muutospyynto);

  let data = new FormData();
  var muutos = new Blob([JSON.stringify(muutospyynto)], {
    type: "application/json"
  });
  data.append("muutospyynto", muutos, "muutospyynnön json-data");

  // attachments.map(item => {
  //   if (item.tiedosto) data.append(item.tiedostoId, item.tiedosto, item.nimi);
  // });
  console.info(data);
  return dispatch => {
    dispatch({ type: SAVE_MUUTOSPYYNTO_START });

    return axios
      .post(`${API_BASE_URL}/muutospyynnot/tallenna`, data, {
        withCredentials: true
      })
      .then(response => {
        dispatch({ type: SAVE_MUUTOSPYYNTO_SUCCESS, payload: response });
      })
      .catch(err => {
        dispatch({ type: SAVE_MUUTOSPYYNTO_FAILURE, payload: err });
      });
  };
}
