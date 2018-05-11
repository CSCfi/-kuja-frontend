import { API_BASE_URL } from "../../../../../../modules/constants"
import { getToimialueList } from "./toimialueUtil"

// Constants
export const FETCH_KUNNAT_START = 'FETCH_KUNNAT_START'
export const FETCH_KUNNAT_SUCCESS = 'FETCH_KUNNAT_SUCCESS'
export const FETCH_KUNNAT_FAILURE = 'FETCH_KUNNAT_FAILURE'

// Actions
export function fetchKunnat() {
  return (dispatch) => {
    dispatch({ type: FETCH_KUNNAT_START })

    const request = fetch(`${API_BASE_URL}/koodistot/kunnat`)

    request
      .then(response => response.json())
      .then(data => { dispatch({ type: FETCH_KUNNAT_SUCCESS, payload: data }) })
      .catch(err => { dispatch({ type: FETCH_KUNNAT_FAILURE, payload: err }) })
  }
}

export const actions = {
  fetchKunnat
}

// Action handlers
const ACTION_HANDLERS = {
  [FETCH_KUNNAT_START] : (state, action) => {
    return {
      ...state,
      isFetching: true,
      fetched: false,
      hasErrored: false
    }
  },
  [FETCH_KUNNAT_SUCCESS] : (state, action) => {
    return {
      ...state,
      isFetching: false,
      fetched: true,
      hasErrored: false,
      data: action.payload,
      kuntaList: getToimialueList(action.payload, 'FI', 'kunta')
    }
  },
  [FETCH_KUNNAT_FAILURE] : (state, action) => {
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

export default function kunnatReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
