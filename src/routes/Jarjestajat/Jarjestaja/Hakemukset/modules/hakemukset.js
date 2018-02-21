import { API_BASE_URL } from "../../../../../modules/constants"

// Constants
export const FETCH_HAKEMUKSET_START = 'FETCH_HAKEMUKSET_START'
export const FETCH_HAKEMUKSET_SUCCESS = 'FETCH_HAKEMUKSET_SUCCESS'
export const FETCH_HAKEMUKSET_FAILURE = 'FETCH_HAKEMUKSET_FAILURE'

// Actions
export function fetchHakemukset(ytunnus, query) {
  return (dispatch) => {
    dispatch({ type: FETCH_HAKEMUKSET_START })

    const request = fetch(`${API_BASE_URL}/muutospyynnot/${ytunnus}${query ? query : ''}`)

    request
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: FETCH_HAKEMUKSET_SUCCESS, payload: data })
      })
      .catch((err) => dispatch({ type: FETCH_HAKEMUKSET_FAILURE, payload: err }))
  }
}

export const actions = {
  fetchHakemukset
}

// Action handlers
const ACTION_HANDLERS = {
  [FETCH_HAKEMUKSET_START]    : (state, action) => {
    return {
      ...state,
      isFetching: true,
      fetched: false,
      hasErrored: false
    }
  },
  [FETCH_HAKEMUKSET_SUCCESS]  : (state, action) => {
    return {
      ...state,
      isFetching: false,
      fetched: true,
      hasErrored: false,
      data: action.payload
    }
  },
  [FETCH_HAKEMUKSET_FAILURE]  : (state, action) => {
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

export default function hakemuksetReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}