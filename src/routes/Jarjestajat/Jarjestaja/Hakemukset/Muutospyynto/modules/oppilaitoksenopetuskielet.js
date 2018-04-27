import { API_BASE_URL } from "../../../../../../modules/constants"

// Constants
export const FETCH_OPPILAITOKSENOPETUSKIELET_START = 'FETCH_OPPILAITOKSENOPETUSKIELET_START'
export const FETCH_OPPILAITOKSENOPETUSKIELET_SUCCESS = 'FETCH_OPPILAITOKSENOPETUSKIELET_SUCCESS'
export const FETCH_OPPILAITOKSENOPETUSKIELET_FAILURE = 'FETCH_OPPILAITOKSENOPETUSKIELET_FAILURE'

// Actions
export function fetchOppilaitoksenopetuskielet() {
  return (dispatch) => {
    dispatch({ type: FETCH_OPPILAITOKSENOPETUSKIELET_START })

    const request = fetch(`${API_BASE_URL}/koodistot/opetuskielet`)

    request
      .then(response => response.json())
      .then(data => dispatch({ type: FETCH_OPPILAITOKSENOPETUSKIELET_SUCCESS, payload: data }))
      .catch(err => dispatch({ type: FETCH_OPPILAITOKSENOPETUSKIELET_FAILURE, payload: err }))
  }
}

export const actions = {
  fetchOppilaitoksenopetuskielet
}

// Action handlers
const ACTION_HANDLERS = {
  [FETCH_OPPILAITOKSENOPETUSKIELET_START] : (state, action) => {
    return {
      ...state,
      isFetching: true,
      fetched: false,
      hasErrored: false
    }
  },
  [FETCH_OPPILAITOKSENOPETUSKIELET_SUCCESS] : (state, action) => {
    return {
      ...state,
      isFetching: false,
      fetched: true,
      hasErrored: false,
      data: action.payload
    }
  },
  [FETCH_OPPILAITOKSENOPETUSKIELET_FAILURE] : (state, action) => {
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

export default function oppilaitoksenopetuskieletReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
