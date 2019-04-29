import { getVankilat } from "./selectors";

import {
  FETCH_VANKILAT_START,
  FETCH_VANKILAT_SUCCESS,
  FETCH_VANKILAT_FAILURE,
  ADD_VANKILA,
  GET_VANKILAT
} from "./actionTypes";

export default function(state, action) {
  switch (action.type) {
    case ADD_VANKILA:
    return {

    }
    case FETCH_VANKILAT_START:
      return {
        ...state,
        isFetching: true,
        fetched: false,
        hasErrored: false
      };
    case FETCH_VANKILAT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        hasErrored: false,
        data: action.payload,
        vankilaList: getVankilat(action.payload, "FI")
      };
    case FETCH_VANKILAT_FAILURE:
      return {
        ...state,
        isFetching: false,
        fetched: false,
        hasErrored: true
      };
    case GET_VANKILAT:
    default:
      return state;
  }
}
