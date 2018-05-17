import { API_BASE_URL } from "../../../../../../modules/constants"
import axios from "axios/index"
import { formatMuutospyynto } from "./koulutusUtil"

// Constants
export const FETCH_MUUTOSPYYNTO_START = 'FETCH_MUUTOSPYYNTO_START'
export const FETCH_MUUTOSPYYNTO_SUCCESS = 'FETCH_MUUTOSPYYNTO_SUCCESS'
export const FETCH_MUUTOSPYYNTO_FAILURE = 'FETCH_MUUTOSPYYNTO_FAILURE'

export const CREATE_MUUTOSPYYNTO_START = 'CREATE_MUUTOSPYYNTO_START'
export const CREATE_MUUTOSPYYNTO_SUCCESS = 'CREATE_MUUTOSPYYNTO_SUCCESS'
export const CREATE_MUUTOSPYYNTO_FAILURE = 'CREATE_MUUTOSPYYNTO_FAILURE'

export const PREVIEW_MUUTOSPYYNTO_START = 'PREVIEW_MUUTOSPYYNTO_START'
export const PREVIEW_MUUTOSPYYNTO_SUCCESS = 'PREVIEW_MUUTOSPYYNTO_SUCCESS'
export const PREVIEW_MUUTOSPYYNTO_FAILURE = 'PREVIEW_MUUTOSPYYNTO_FAILURE'

// Actions
export function fetchMuutospyynto(ytunnus, query) {
  return (dispatch) => {
    dispatch({ type: FETCH_MUUTOSPYYNTO_START })

    const request = fetch(`${API_BASE_URL}/muutospyynnot/${ytunnus}${query ? query : ''}`)

    request
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: FETCH_MUUTOSPYYNTO_SUCCESS, payload: data })
      })
      .catch((err) => dispatch({ type: FETCH_MUUTOSPYYNTO_FAILURE, payload: err }))
  }
}

export function createMuutospyynto(muutospyynto) {
  const formatted = formatMuutospyynto(muutospyynto)

  let obj = {}
  return (dispatch) => {
    dispatch({ type: CREATE_MUUTOSPYYNTO_START })

    axios.put(`${API_BASE_URL}/muutospyynnot/create`, formatted)
      .then(response => {
        dispatch({ type: CREATE_MUUTOSPYYNTO_SUCCESS, payload: response })
      })
      .catch(err => {
        dispatch({ type: CREATE_MUUTOSPYYNTO_FAILURE, payload: err })
      })
  }
}

export function previewMuutospyynto(muutospyynto) {
  console.log("PDFksi: " + JSON.stringify(muutospyynto))
    return (dispatch) => {
        dispatch({ type: PREVIEW_MUUTOSPYYNTO_START })

        return axios.put(`${API_BASE_URL}/pdf/muutospyyntoToPdf`,
            muutospyynto,
            {
                responseType: 'arraybuffer',
                headers: {
                    'Content-Type': 'text/plain',
                    'Accept': 'application/pdf'
                }
            })
            .then(response => {
                dispatch({ type: PREVIEW_MUUTOSPYYNTO_SUCCESS, payload: response })
            })
            .catch(err => {
                dispatch({ type: PREVIEW_MUUTOSPYYNTO_FAILURE, payload: err })
            })
    }
}

export const actions = {
  fetchMuutospyynto,
  createMuutospyynto,
  previewMuutospyynto
}

// Action handlers
const ACTION_HANDLERS = {
  [FETCH_MUUTOSPYYNTO_START]    : (state, action) => {
    return {
      ...state,
      isFetching: true,
      fetched: false,
      hasErrored: false
    }
  },
  [FETCH_MUUTOSPYYNTO_SUCCESS]  : (state, action) => {
    return {
      ...state,
      isFetching: false,
      fetched: true,
      hasErrored: false,
      data: action.payload
    }
  },
  [FETCH_MUUTOSPYYNTO_FAILURE]  : (state, action) => {
    return {
      ...state,
      isFetching: false,
      fetched: false,
      hasErrored: true
    }
  },
    [CREATE_MUUTOSPYYNTO_START]   : (state, action) => {
        return {
            ...state,
            create: {
                isSubmitting: true,
                isCreated: false,
                hasErrored: false,
            }
        }
    },
    [CREATE_MUUTOSPYYNTO_SUCCESS]   : (state, action) => {
        return {
            ...state,
            create: {
                isSubmitting: false,
                isCreated: true,
                hasErrored: false,
                response: action.payload
            }
        }
    },
    [CREATE_MUUTOSPYYNTO_FAILURE]   : (state, action) => {
        return {
            ...state,
            create: {
                isSubmitting: false,
                hasCreated: false,
                hasErrored: true,
                response: action.payload
            }
        }
    },
    [PREVIEW_MUUTOSPYYNTO_START]   : (state, action) => {
      return {
        ...state,
        isFetching: true,
        fetched: false,
        hasErrored: false
      }
    },
    [PREVIEW_MUUTOSPYYNTO_SUCCESS]   : (state, action) => {
      return {
        ...state,
        isFetching: false,
        fetched: true,
        hasErrored: false,
        pdf: action.payload
      }
    },
    [PREVIEW_MUUTOSPYYNTO_FAILURE]   : (state, action) => {
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
  data: {},
  create: undefined
}

export default function muutospyyntoReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
