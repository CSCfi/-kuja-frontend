import { API_BASE_URL } from 'modules/constants'

// Constants
export const FETCH_LUPA_START = 'FETCH_LUPA_START'
export const FETCH_LUPA_SUCCESS = 'FETCH_LUPA_SUCCESS'
export const FETCH_LUPA_FAILURE = 'FETCH_LUPA_FAILURE'

// Actions
export function fetchLupa(ytunnus, query) {
  return (dispatch) => {
    dispatch({ type: FETCH_LUPA_START })

    const request = fetch(`${API_BASE_URL}/luvat/jarjestaja/${ytunnus}${query = query ? query : ''}`)

    request
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: FETCH_LUPA_SUCCESS, payload: data })
      })
      .catch((err) => dispatch({ type: FETCH_LUPA_FAILURE, payload: err }))
  }
}

export const actions = {
  fetchLupa
}

// Action handlers
const ACTION_HANDLERS = {
  [FETCH_LUPA_START]   : (state, action) => {
    return {
      ...state,
      isFetching: true,
      fetched: false,
      hasErrored: false
    }
  },
  [FETCH_LUPA_SUCCESS] : (state, action) => {
    return {
      ...state,
      isFetching: false,
      fetched: true,
      hasErrored: false,
      data: action.payload
    }
  },
  [FETCH_LUPA_FAILURE] : (state, action) => {
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

export default function lupaReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
