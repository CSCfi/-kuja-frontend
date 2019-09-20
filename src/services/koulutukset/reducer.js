import { parseKoulutuksetAll, parseMuut } from "./koulutusParser";
import * as R from "ramda";

import {
  FETCH_KOULUTUKSET_ALL_START,
  FETCH_KOULUTUKSET_ALL_SUCCESS,
  FETCH_KOULUTUKSET_ALL_FAILURE,
  FETCH_KOULUTUKSET_MUUT_START,
  FETCH_KOULUTUKSET_MUUT_SUCCESS,
  FETCH_KOULUTUKSET_MUUT_FAILURE,
  FETCH_KOULUTUS_START,
  FETCH_KOULUTUS_SUCCESS,
  FETCH_KOULUTUS_FAILURE
} from "./actionTypes";

export default function(state, action) {
  switch (action.type) {
    case FETCH_KOULUTUKSET_ALL_START:
      return {
        ...state,
        isFetching: true,
        fetched: false,
        hasErrored: false
      };
    case FETCH_KOULUTUKSET_ALL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        hasErrored: false,
        koulutusdata: parseKoulutuksetAll(
          action.payload.data,
          action.payload.koulutusalat,
          action.payload.koulutustyypit
        )
      };
    case FETCH_KOULUTUKSET_ALL_FAILURE:
      return {
        ...state,
        isFetching: false,
        fetched: false,
        hasErrored: true
      };
    case FETCH_KOULUTUKSET_MUUT_START:
      return {
        ...state,
        muut: {
          isFetching: true,
          fetched: [],
          hasErrored: false
        }
      };
    case FETCH_KOULUTUKSET_MUUT_SUCCESS:
      return {
        ...state,
        muut: {
          isFetching: false,
          fetched: [...state.muut.fetched, action.koodisto],
          hasErrored: false,
          muudata: {
            ...state.muut.muudata,
            [action.koodisto]: parseMuut(action.payload)
          }
        }
      };
    case FETCH_KOULUTUKSET_MUUT_FAILURE:
      return {
        ...state,
        muut: {
          isFetching: false,
          fetched: [],
          hasErrored: true
        }
      };
    case FETCH_KOULUTUS_START:
      return {
        ...state,
        poikkeukset: {
          ...state.poikkeukset,
          isFetching: true,
          fetched: [],
          hasErrored: false
        }
      };
    case FETCH_KOULUTUS_SUCCESS:
      return {
        ...state,
        poikkeukset: {
          ...state.poikkeukset,
          isFetching: false,
          fetched: [...state.poikkeukset.fetched, action.koodi],
          hasErrored: false,
          data: R.uniq([...state.poikkeukset.data, action.payload])
        }
      };
    case FETCH_KOULUTUS_FAILURE:
      return {
        ...state,
        poikkeukset: {
          ...state.poikkeukset,
          isFetching: false,
          fetched: [],
          hasErrored: true
        }
      };
    default:
      return state;
  }
}
