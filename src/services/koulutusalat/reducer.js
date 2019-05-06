import { parseKoulutusalat } from "../koulutukset/koulutusParser";

import {
  FETCH_KOULUTUSALAT_START,
  FETCH_KOULUTUSALAT_SUCCESS,
  FETCH_KOULUTUSALAT_FAILURE
} from "./actionTypes";

export default function(state, action) {
  switch (action.type) {
    case FETCH_KOULUTUSALAT_START:
      return {
        ...state,
        isFetching: true,
        fetched: false,
        hasErrorer: false
      };
    case FETCH_KOULUTUSALAT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        hasErrored: false,
        data: parseKoulutusalat(action.payload)
      };
    case FETCH_KOULUTUSALAT_FAILURE:
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
