import { SET_SECTION_DATA } from "./actionTypes";

export default function(state, action) {
  switch (action.type) {
    case SET_SECTION_DATA:
      return {
        ...state,
        [action.payload.sectionId]: action.payload
      };
    default:
      return state;
  }
}
