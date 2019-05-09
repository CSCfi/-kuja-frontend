import { sortOpetuskielet } from "../../scenes/Jarjestajat/Jarjestaja/Hakemukset/Muutospyynto/modules/kieliUtil";
import {
  FETCH_OPPILAITOKSENOPETUSKIELET_START,
  FETCH_OPPILAITOKSENOPETUSKIELET_SUCCESS,
  FETCH_OPPILAITOKSENOPETUSKIELET_FAILURE
} from "./actionTypes";

export default function(state, action) {
  switch (action.type) {
    case FETCH_OPPILAITOKSENOPETUSKIELET_START:
      return {
        ...state,
        isFetching: true,
        fetched: false,
        hasErrored: false
      };
    case FETCH_OPPILAITOKSENOPETUSKIELET_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        hasErrored: false,
        data: sortOpetuskielet(action.payload)
      };
    case FETCH_OPPILAITOKSENOPETUSKIELET_FAILURE:
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
