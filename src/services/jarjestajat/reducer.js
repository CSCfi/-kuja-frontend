import _ from "lodash";

import {
  FETCH_LUVAT_START,
  FETCH_LUVAT_SUCCESS,
  FETCH_LUVAT_FAILURE
} from "./actionTypes";

export default function(state, action) {
  switch (action.type) {
    case FETCH_LUVAT_START:
      return {
        ...state,
        isFetching: true,
        fetched: false,
        hasErrored: false
      };
    case FETCH_LUVAT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        hasErrored: false,
        data: _.mapKeys(action.payload, "uuid")
      };
    case FETCH_LUVAT_FAILURE:
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