import { API_BASE_URL } from "../../../../modules/constants"
import axios from "axios/index"
//import { formatMuutospyynto } from "./koulutusUtil"

// Constants
export const FETCH_MUUTOSPYYNTO_START = 'FETCH_MUUTOSPYYNTO_START'
export const FETCH_MUUTOSPYYNTO_SUCCESS = 'FETCH_MUUTOSPYYNTO_SUCCESS'
export const FETCH_MUUTOSPYYNTO_FAILURE = 'FETCH_MUUTOSPYYNTO_FAILURE'

export const CREATE_MUUTOSPYYNTO_START = 'CREATE_MUUTOSPYYNTO_START'
export const CREATE_MUUTOSPYYNTO_SUCCESS = 'CREATE_MUUTOSPYYNTO_SUCCESS'
export const CREATE_MUUTOSPYYNTO_FAILURE = 'CREATE_MUUTOSPYYNTO_FAILURE'

// Actions
export function fetchMuutospyynto(uuid) {
    /*
    return (dispatch) => {
        dispatch({ type: FETCH_MUUTOSPYYNTO_START })

        const request = fetch(`${API_BASE_URL}/muutospyynnot/id/${uuid}`)

        request
            .then((response) => response.json())
            .then((data) => {
                dispatch({ type: FETCH_MUUTOSPYYNTO_SUCCESS, payload: data })
            })
            .catch((err) => dispatch({ type: FETCH_MUUTOSPYYNTO_FAILURE, payload: err }))
    }
    */
    return (dispatch) => {

        dispatch({type: FETCH_MUUTOSPYYNTO_START})

        return axios.get(`${API_BASE_URL}/muutospyynnot/id/${uuid}`)
            .then((response) => {
                dispatch({type: FETCH_MUUTOSPYYNTO_SUCCESS, payload: response.data})
            })
            .catch((err) => dispatch({type: FETCH_MUUTOSPYYNTO_FAILURE, payload: err}))
    }
}

export function createMuutospyynto(muutospyynto) {
    const formatted = muutospyynto

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

export const actions = {
    fetchMuutospyynto,
    createMuutospyynto
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
    }
}

// Reducer
const initialState = {
    isFetching: false,
    fetched: false,
    hasErrored: false,
    data: {}
}

export default function muutospyyntoReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}