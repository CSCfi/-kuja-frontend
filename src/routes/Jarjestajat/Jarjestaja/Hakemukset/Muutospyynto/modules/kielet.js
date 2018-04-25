import { API_BASE_URL } from "../../../../../../modules/constants"

// Constants
export const FETCH_KIELET_START = 'FETCH_KIELET_START'
export const FETCH_KIELET_SUCCESS = 'FETCH_KIELET_SUCCESS'
export const FETCH_KIELET_FAILURE = 'FETCH_KIELET_FAILURE'

// Actions
export function fetchKielet() {
  return (dispatch) => {
    dispatch({ type: FETCH_KIELET_START })

    const request = fetch(`${API_BASE_URL}/koodistot/kielet`)

    request
      .then(response => response.json())
      .then(data => dispatch({ type: FETCH_KIELET_SUCCESS, payload: data }))
      .catch(err => dispatch({ type: FETCH_KIELET_FAILURE, payload: err }))
  }
}

export const actions = {
  fetchKielet
}

// Action handlers
const ACTION_HANDLERS = {
  [FETCH_KIELET_START] : (state, action) => {
    return {
      ...state,
      isFetching: true,
      fetched: false,
      hasErrored: false
    }
  },
  [FETCH_KIELET_SUCCESS] : (state, action) => {
    return {
      ...state,
      isFetching: false,
      fetched: true,
      hasErrored: false,
      data: action.payload
    }
  },
  [FETCH_KIELET_FAILURE] : (state, action) => {
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

export default function kieletReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
