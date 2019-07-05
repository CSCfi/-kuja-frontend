import {
  FETCH_MAAKUNTAKUNNAT_START,
  FETCH_MAAKUNTAKUNNAT_SUCCESS,
  FETCH_MAAKUNTAKUNNAT_FAILURE
} from "./actionTypes";

export default function maakuntakunnatReducer(state, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

const ACTION_HANDLERS = {
  [FETCH_MAAKUNTAKUNNAT_START] : (state, action) => {
    return {
      ...state,
      isFetching: true,
      fetched: false,
      hasErrored: false
    }
  },
  [FETCH_MAAKUNTAKUNNAT_SUCCESS] : (state, action) => {
    return {
      ...state,
      isFetching: false,
      fetched: true,
      hasErrored: false,
      data: action.payload,
      // maakuntakunnatList: getMaakuntakunnatList(action.payload, 'FI')
    }
  },
  [FETCH_MAAKUNTAKUNNAT_FAILURE] : (state, action) => {
    return {
      ...state,
      isFetching: false,
      fetched: false,
      hasErrored: true
    }
  }
}