import { getELYkeskusList } from "scenes/Jarjestajat/Jarjestaja/Hakemukset/Muutospyynto/modules/ELYkeskusUtil"

import {
  FETCH_ELYKESKUKSET_START,
  FETCH_ELYKESKUKSET_SUCCESS,
  FETCH_ELYKESKUKSET_FAILURE
} from "./actionTypes";

export default function(state, action) {
  switch (action.type) {
    case FETCH_ELYKESKUKSET_START:
      return {
        ...state,
        isFetching: true,
        fetched: false,
        hasErrored: false
      };
    case FETCH_ELYKESKUKSET_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        hasErrored: false,
        data: action.payload,
        ELYkeskusList: getELYkeskusList(action.payload, "FI")
      };
    case FETCH_ELYKESKUKSET_FAILURE:
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
