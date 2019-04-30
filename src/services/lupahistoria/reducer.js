import {
  FETCH_HISTORY_START,
  FETCH_HISTORY_SUCCESS,
  FETCH_HISTORY_FAILURE
} from "./actionTypes";

export default function(state, action) {
  switch (action.type) {
    case FETCH_HISTORY_START:
      return {
        ...state,
        isFetching: true,
        fetched: false,
        hasErrored: false
      };
    case FETCH_HISTORY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        hasErrored: false,
        data: action.payload
      };
    case FETCH_HISTORY_FAILURE:
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
