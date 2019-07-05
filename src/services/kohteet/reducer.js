import {
  FETCH_KOHTEET_START,
  FETCH_KOHTEET_SUCCESS,
  FETCH_KOHTEET_FAILURE
} from "./actionTypes";

export default function(state, action) {
  switch (action.type) {
    case FETCH_KOHTEET_START:
      return {
        ...state,
        isFetching: true,
        fetched: false,
        hasErrored: false
      };
    case FETCH_KOHTEET_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        hasErrored: false,
        data: action.payload
      };
    case FETCH_KOHTEET_FAILURE:
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
