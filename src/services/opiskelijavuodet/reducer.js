import _ from "lodash";

import {
  FETCH_OPISKELIJAVUODET_START,
  FETCH_OPISKELIJAVUODET_SUCCESS,
  FETCH_OPISKELIJAVUODET_FAILURE
} from "./actionTypes";

export default function(state, action) {
  switch (action.type) {
    case FETCH_OPISKELIJAVUODET_START:
      return {
        ...state,
        isFetching: true,
        fetched: false,
        hasErrored: false
      };
    case FETCH_OPISKELIJAVUODET_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        hasErrored: false,
        data: action.payload
      };
    case FETCH_OPISKELIJAVUODET_FAILURE:
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
