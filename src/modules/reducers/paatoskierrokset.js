import { API_BASE_URL } from "../constants"

// Constants
export const FETCH_PAATOSKIERROKSET_START = 'FETCH_PAATOSKIERROKSET_START'
export const FETCH_PAATOSKIERROKSET_SUCCESS = 'FETCH_PAATOSKIERROKSET_SUCCESS'
export const FETCH_PAATOSKIERROKSET_FAILURE = 'FETCH_PAATOSKIERROKSET_FAILURE'

// Actions
export function fetchPaatoskierrokset() {
  return (dispatch) => {
    dispatch({ type: FETCH_PAATOSKIERROKSET_START })

    const request = fetch(`${API_BASE_URL}/paatoskierrokset/open`)

    request
      .then(response => response.json())
      .then(data => {
        dispatch({ type: FETCH_PAATOSKIERROKSET_SUCCESS, payload: data })
      })
      .catch(err => dispatch({ type: FETCH_PAATOSKIERROKSET_FAILURE, payload: err }))
  }
}

export const actions = {
  fetchPaatoskierrokset
}

// Action handlers
const ACTION_HANDLERS = {
  [FETCH_PAATOSKIERROKSET_START] : (state, action) => {
    return {
      ...state,
      isFetching: true,
      fetched: false,
      hasErrored: false
    }
  },
  [FETCH_PAATOSKIERROKSET_SUCCESS] : (state, action) => {
    return {
      ...state,
      isFetching: false,
      fetched: true,
      hasErrored: false,
      data: action.payload
    }
  },
  [FETCH_PAATOSKIERROKSET_FAILURE] : (state, action) => {
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

export default function paatoskierroksetReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
