import { parseLupa } from "./lupaParser";

import {
  FETCH_LUPA_START,
  FETCH_LUPA_SUCCESS,
  FETCH_LUPA_FAILURE
} from "./actionTypes";

export default function(state, action) {
  switch (action.type) {
    case FETCH_LUPA_START:
      return {
        ...state,
        isFetching: true,
        fetched: false,
        hasErrored: false
      };
    case FETCH_LUPA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        hasErrored: false,
        data: action.payload,
        kohteet: parseLupa(action.payload)
      };
    case FETCH_LUPA_FAILURE:
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
