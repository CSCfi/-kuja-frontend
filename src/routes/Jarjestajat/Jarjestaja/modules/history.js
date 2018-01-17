import { API_BASE_URL } from 'modules/constants'

// Constants
export const FETCH_HISTORY_START = 'FETCH_HISTORY_START'
export const FETCH_HISTORY_SUCCESS = 'FETCH_HISTORY_SUCCESS'
export const FETCH_HISTORY_FAILURE = 'FETCH_HISTORY_FAILURE'

// Actions
export function fetchLupaHistory(oid) {
  return (dispatch) => {
    dispatch({ type: FETCH_HISTORY_START })

    const request = fetch(`${API_BASE_URL}/luvat/historia?oid=${oid}`)

    request
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: FETCH_HISTORY_SUCCESS, payload: data })
      })
      .catch((err) => dispatch({ type: FETCH_HISTORY_FAILURE, payload: err }))
  }
}

export const actions = {
  fetchLupaHistory
}

// Action handlers
const ACTION_HANDLERS = {
  [FETCH_HISTORY_START]   : (state, action) => {
    return {
      ...state,
      isFetching: true,
      fetched: false,
      hasErrored: false
    }
  },
  [FETCH_HISTORY_SUCCESS] : (state, action) => {
    return {
      ...state,
      isFetching: false,
      fetched: true,
      hasErrored: false,
      data: action.payload
    }
  },
  [FETCH_HISTORY_FAILURE] : (state, action) => {
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

export default function historyReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
