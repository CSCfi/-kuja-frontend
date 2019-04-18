import _ from 'lodash'

import { API_BASE_URL } from 'modules/constants'

// Constants
export const FETCH_LUVAT_SUCCESS = 'FETCH_LUVAT_SUCCESS'
export const FETCH_LUVAT_START = 'FETCH_LUVAT_START'
export const FETCH_LUVAT_FAILURE = 'FETCH_LUVAT_FAILURE'


// Actions
export function fetchLuvat() {
  return (dispatch) => {
    dispatch({ type: FETCH_LUVAT_START })

    const request = fetch(`${API_BASE_URL}/luvat/jarjestajilla`)

    request
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: FETCH_LUVAT_SUCCESS, payload: data })
      })
      .catch((err) => dispatch({ type: FETCH_LUVAT_FAILURE, payload: err }))
  }
}

export const actions = {
  fetchLuvat
}

// Action handlers
const ACTION_HANDLERS = {
  [FETCH_LUVAT_START]   : (state, action) => { 
    return { 
      ...state, 
      isFetching: true, 
      fetched: false, 
      hasErrored: false
    } 
  },
  [FETCH_LUVAT_SUCCESS] : (state, action) => { 
    return { 
      ...state, 
      isFetching: false, 
      fetched: true, 
      hasErrored: false, 
      data: _.mapKeys(action.payload, 'uuid')
    } 
  },
  [FETCH_LUVAT_FAILURE] : (state, action) => {
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

export default function luvatReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
