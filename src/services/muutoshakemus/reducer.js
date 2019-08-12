import {
  SAVE_MUUTOSPYYNTO_START,
  SAVE_MUUTOSPYYNTO_SUCCESS,
  SAVE_MUUTOSPYYNTO_FAILURE,
  SET_SECTION_DATA
} from "./actionTypes";

export default function(state, action) {
  switch (action.type) {
    case SET_SECTION_DATA:
      return {
        ...state,
        [action.payload.sectionId]: action.payload
      };
    case SAVE_MUUTOSPYYNTO_START:
      return {
        ...state,
        save: {
          isSaving: true,
          saved: false,
          hasErrored: false
        }
      };
    case SAVE_MUUTOSPYYNTO_SUCCESS:
      console.info(state, action.payload);
      return {
        ...state,
        save: {
          isSaving: false,
          saved: true,
          hasErrored: false,
          data: action.payload
        }
      };
    case SAVE_MUUTOSPYYNTO_FAILURE:
      return {
        ...state,
        save: {
          isSaving: false,
          saved: false,
          hasErrored: true
        }
      };
    default:
      return state;
  }
}
