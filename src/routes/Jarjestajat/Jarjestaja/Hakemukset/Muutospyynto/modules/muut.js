import { API_BASE_URL } from "../../../../../../modules/constants"

// Constants
export const FETCH_MUUT_START = 'FETCH_MUUT_START'
export const FETCH_MUUT_SUCCESS = 'FETCH_MUUT_SUCCESS'
export const FETCH_MUUT_FAILURE = 'FETCH_MUUT_FAILURE'

// Actions
export function fetchMuut() {
  return (dispatch) => {
    dispatch({ type: FETCH_MUUT_START })

    const request = fetch(`${API_BASE_URL}/koodistot/koodit/oivamuutoikeudetvelvollisuudetehdotjatehtavat`)

    request
      .then(response => response.json())
      .then(data => { dispatch({ type: FETCH_MUUT_SUCCESS, payload: data }) })
      .catch(err => { dispatch({ type: FETCH_MUUT_FAILURE, payload: err }) })
  }
}

export const actions = {
  fetchMuut
}

// Action handlers
const ACTION_HANDLERS = {
  [FETCH_MUUT_START] : (state, action) => {
    return {
      ...state,
      isFetching: true,
      fetched: false,
      hasErrored: false
    }
  },
  [FETCH_MUUT_SUCCESS] : (state, action) => {
    return {
      ...state,
      isFetching: false,
      fetched: true,
      hasErrored: false,
      data: action.payload
    }
  },
  [FETCH_MUUT_FAILURE] : (state, action) => {
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
