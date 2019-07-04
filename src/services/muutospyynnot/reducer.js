import {
  FETCH_MUUTOSPYYNNOT_START,
  FETCH_MUUTOSPYYNNOT_SUCCESS,
  FETCH_MUUTOSPYYNNOT_FAILURE,
  FETCH_MUUTOSPYYNTO_START,
  FETCH_MUUTOSPYYNTO_SUCCESS,
  FETCH_MUUTOSPYYNTO_FAILURE
} from "./actionTypes";

export default function(state, action) {
  switch (action.type) {
    case FETCH_MUUTOSPYYNTO_START:
      return {
        ...state,
        isFetching: true,
        fetched: false,
        hasErrored: false
      };
    case FETCH_MUUTOSPYYNTO_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        hasErrored: false,
        muutospyynto: action.payload
      };
    case FETCH_MUUTOSPYYNTO_FAILURE:
      return {
        ...state,
        isFetching: false,
        fetched: false,
        hasErrored: true
      };
    case FETCH_MUUTOSPYYNNOT_START:
      return {
        ...state,
        isFetching: true,
        fetched: false,
        hasErrored: false
      };
    case FETCH_MUUTOSPYYNNOT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        hasErrored: false,
        data: action.payload
      };
    case FETCH_MUUTOSPYYNNOT_FAILURE:
      return {
        ...state,
        isFetching: false,
        fetched: false,
        hasErrored: true
      };
    default:
      return state;
  }
}
