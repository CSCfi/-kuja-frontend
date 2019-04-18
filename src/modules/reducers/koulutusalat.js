import { API_BASE_URL } from "../constants"
import { parseKoulutusalat } from "scenes/Jarjestajat/Jarjestaja/Hakemukset/Muutospyynto/modules/koulutusParser"

// Constants
export const FETCH_KOULUTUSALAT_START = 'FETCH_KOULUTUSALAT_START'
export const FETCH_KOULUTUSALAT_SUCCESS = 'FETCH_KOULUTUSALAT_SUCCESS'
export const FETCH_KOULUTUSALAT_FAILURE = 'FETCH_KOULUTUSALAT_FAILURE'

// Actions
export function fetchKoulutusalat() {
  return (dispatch) => {
    dispatch({ type: FETCH_KOULUTUSALAT_START })

    const request = fetch(`${API_BASE_URL}/koodistot/koulutusalat/`)

    return request
      .then(response => response.json())
      .then(data => {
        dispatch({ type: FETCH_KOULUTUSALAT_SUCCESS, payload: data })
      })
      .catch(err => dispatch({ type: FETCH_KOULUTUSALAT_FAILURE, payload: err }))
  }
}

export const actions = {
  fetchKoulutusalat
}

// Action handlers
const ACTION_HANDLERS = {
  [FETCH_KOULUTUSALAT_START] : (state, action) => {
    return {
      ...state,
      isFetching: true,
      fetched: false,
      hasErrorer: false
    }
  },
  [FETCH_KOULUTUSALAT_SUCCESS] : (state, action) => {
    return {
      ...state,
      isFetching: false,
      fetched: true,
      hasErrored: false,
      data: parseKoulutusalat(action.payload)
    }
  },
  [FETCH_KOULUTUSALAT_FAILURE] : (state, action) => {
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
  data: []
}

export default function koulutusalatReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
