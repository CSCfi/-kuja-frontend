import { API_BASE_URL } from "../../../../../../modules/constants"
import { getToimialueList } from "./toimialueUtil"

// Constants
export const FETCH_MAAKUNNAT_START = 'FETCH_MAAKUNNAT_START'
export const FETCH_MAAKUNNAT_SUCCESS = 'FETCH_MAAKUNNAT_SUCCESS'
export const FETCH_MAAKUNNAT_FAILURE = 'FETCH_MAAKUNNAT_FAILURE'

// Actions
export function fetchMaakunnat() {
  return (dispatch) => {
    dispatch({ type: FETCH_MAAKUNNAT_START })

    const request = fetch(`${API_BASE_URL}/koodistot/maakunnat`)

    request
      .then(response => response.json())
      .then(data => { dispatch({ type: FETCH_MAAKUNNAT_SUCCESS, payload: data }) })
      .catch(err => { dispatch({ type: FETCH_MAAKUNNAT_FAILURE, payload: err }) })
  }
}

export const actions = {
  fetchMaakunnat
}

// Action handlers
const ACTION_HANDLERS = {
  [FETCH_MAAKUNNAT_START] : (state, action) => {
    return {
      ...state,
      isFetching: true,
      fetched: false,
      hasErrored: false
    }
  },
  [FETCH_MAAKUNNAT_SUCCESS] : (state, action) => {
    return {
      ...state,
      isFetching: false,
      fetched: true,
      hasErrored: false,
      data: action.payload,
      maakuntaList: getToimialueList(action.payload, 'FI', 'maakunta')
    }
  },
  [FETCH_MAAKUNNAT_FAILURE] : (state, action) => {
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

export default function maakunnatReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
