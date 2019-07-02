import { SET_SECTION_DATA } from "./actionTypes";

export const setSectionData = (sectionId, payload) => {
  return dispatch => {
    dispatch({
      type: SET_SECTION_DATA,
      payload
    });
  };
};
