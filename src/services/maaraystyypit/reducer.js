import _ from "lodash";

import {
  FETCH_MAARAYSTYYPIT_START,
  FETCH_MAARAYSTYYPIT_SUCCESS,
  FETCH_MAARAYSTYYPIT_FAILURE
} from "./actionTypes";

export default function(state, action) {
  switch (action.type) {
    case FETCH_MAARAYSTYYPIT_START:
      return {
        ...state,
        isFetching: true,
        fetched: false,
        hasErrored: false
      };
    case FETCH_MAARAYSTYYPIT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        hasErrored: false,
        data: action.payload
      };
    case FETCH_MAARAYSTYYPIT_FAILURE:
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
