import {
  FETCH_PAATOSKIERROKSET_START,
  FETCH_PAATOSKIERROKSET_SUCCESS,
  FETCH_PAATOSKIERROKSET_FAILURE
} from "./actionTypes";

export default function(state, action) {
  switch (action.type) {
    case FETCH_PAATOSKIERROKSET_START:
    return {
      ...state,
      isFetching: true,
      fetched: false,
      hasErrored: false
    }
    case FETCH_PAATOSKIERROKSET_SUCCESS:
    return {
      ...state,
      isFetching: false,
      fetched: true,
      hasErrored: false,
      data: action.payload
    }
    case FETCH_PAATOSKIERROKSET_FAILURE:
    return {
      ...state,
      isFetching: false,
      fetched: false,
      hasErrored: true
    }
    default:
      return state;
  }
}
