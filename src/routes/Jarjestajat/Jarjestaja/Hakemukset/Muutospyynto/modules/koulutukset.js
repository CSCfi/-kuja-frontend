import { API_BASE_URL } from "../../../../../../modules/constants"
import { parseKoulutukset } from "./koulutusParser"

// Constants
export const FETCH_KOULUTUKSET_START = 'FETCH_KOULUTUKSET_START'
export const FETCH_KOULUTUKSET_SUCCESS = 'FETCH_KOULUTUKSET_SUCCESS'
export const FETCH_KOULUTUKSET_FAILURE = 'FETCH_KOULUTUKSET_FAILURE'

// Actions
export function fetchKoulutukset(koodiarvo, metadata) {
  return (dispatch) => {
    dispatch({ type: FETCH_KOULUTUKSET_START })

    const request = fetch(`${API_BASE_URL}/koodistot/koulutusalat/${koodiarvo}/koulutukset`)

    request
      .then(response => response.json())
      .then(data => {
        dispatch({ type: FETCH_KOULUTUKSET_SUCCESS, payload: data, koodiarvo, metadata })
      })
      .catch(err => dispatch({ type: FETCH_KOULUTUKSET_FAILURE, payload: err }))
  }
}

export const actions = {
  fetchKoulutukset
}

// Action handlers
const ACTION_HANDLERS = {
  [FETCH_KOULUTUKSET_START] : (state, action) => {
    return {
      ...state,
      isFetching: true,
      fetched: false,
      hasErrorer: false
    }
  },
  [FETCH_KOULUTUKSET_SUCCESS] : (state, action) => {
    return {
      ...state,
      isFetching: false,
      fetched: true,
      hasErrored: false,
      data: {
        ...state.data,
        [action.koodiarvo]: action.payload
      },
      treedata: {
        ...state.treedata,
        [action.koodiarvo]: parseKoulutukset(action.payload, action.koodiarvo, action.metadata)
      }
    }
  },
  [FETCH_KOULUTUKSET_FAILURE] : (state, action) => {
    return {
      ...state,
      isFetching: false,
      fetched: false,
      hasErrored: true
    }
  }
}

// Reducer
const initialState = {
  isFetching: false,
  fetched: false,
  hasErrored: false,
  data: {}
}

export default function koulutuksetReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
