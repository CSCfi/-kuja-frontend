import { SET_SECTION_DATA } from "./actionTypes";

export const setSectionData = payload => {
  return dispatch => {
    dispatch({
      type: SET_SECTION_DATA,
      payload
    });
  };
};
