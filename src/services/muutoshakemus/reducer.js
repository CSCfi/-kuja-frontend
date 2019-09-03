import {
  SET_BACKEND_CHANGES,
  SAVE_MUUTOSPYYNTO_START,
  SAVE_MUUTOSPYYNTO_SUCCESS,
  SAVE_MUUTOSPYYNTO_FAILURE,
  SET_SECTION_DATA
} from "./actionTypes";

export default function(state, action) {
  switch (action.type) {
    case SET_BACKEND_CHANGES:
      return {
        ...state,
        backendChanges: action.changes
      };
    case SET_SECTION_DATA:
      return {
        ...state,
        [action.payload.sectionId]: {
          ...state[action.payload.sectionId] || {},
          state: action.payload
        }
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
