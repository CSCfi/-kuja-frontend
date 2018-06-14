import { API_BASE_URL } from "../constants"

// Constants
export const FETCH_MAARAYSTYYPIT_START = 'FETCH_MAARAYSTYYPIT_START'
export const FETCH_MAARAYSTYYPIT_SUCCESS = 'FETCH_MAARAYSTYYPIT_SUCCESS'
export const FETCH_MAARAYSTYYPIT_FAILURE = 'FETCH_MAARAYSTYYPIT_FAILURE'

// Actions
export function fetchMaaraystyypit() {
  return (dispatch) => {
    dispatch({ type: FETCH_MAARAYSTYYPIT_START })

    const request = fetch(`${API_BASE_URL}/maaraykset/maaraystyypit`)

    request
      .then(response => response.json())
      .then(data => { dispatch({ type: FETCH_MAARAYSTYYPIT_SUCCESS, payload: data }) })
      .catch(err => { dispatch({ type: FETCH_MAARAYSTYYPIT_FAILURE, payload: err }) })
  }
}

export const actions = {
  fetchMaaraystyypit
}

// Action handlers
const ACTION_HANDLERS = {
  [FETCH_MAARAYSTYYPIT_START] : (state, action) => {
    return {
      ...state,
      isFetching: true,
      fetched: false,
      hasErrored: false
    }
  },
  [FETCH_MAARAYSTYYPIT_SUCCESS] : (state, action) => {
    return {
      ...state,
      isFetching: false,
      fetched: true,
      hasErrored: false,
      data: action.payload,
    }
  },
  [FETCH_MAARAYSTYYPIT_FAILURE] : (state, action) => {
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

export default function maaraystyypitReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
