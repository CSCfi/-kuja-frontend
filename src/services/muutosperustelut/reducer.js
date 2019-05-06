import {
  GET_MUUTOSPERUSTELU_BY_KOODIARVO,
  FETCH_MUUTOSPERUSTELUT_START,
  FETCH_MUUTOSPERUSTELUT_SUCCESS,
  FETCH_MUUTOSPERUSTELUT_FAILURE
} from "./actionTypes";
import { getMuutosperusteluList } from "services/muutosperustelut/muutosperusteluUtil";

const initialState = {
  user: {},
  isFetching: false,
  fetched: false,
  hasErrored: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_MUUTOSPERUSTELUT_START:
      return {
        ...state,
        isFetching: true,
        fetched: false,
        hasErrored: false
      };
    case FETCH_MUUTOSPERUSTELUT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        hasErrored: false,
        data: action.payload,
        muutosperusteluList: getMuutosperusteluList(action.payload, "FI")
      };
    case FETCH_MUUTOSPERUSTELUT_FAILURE:
      return {
        ...state,
        isFetching: false,
        fetched: false,
        hasErrored: true
      };
    case GET_MUUTOSPERUSTELU_BY_KOODIARVO:
      return {
        ...state,
        isFetching: true,
        fetched: false,
        hasErrored: false
      };
    default:
      return state;
  }
}
