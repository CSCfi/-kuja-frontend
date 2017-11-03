import { API_BASE_URL } from 'helpers/Constants'

export const FETCH_LUVAT_SUCCESS = 'FETCH_LUVAT_SUCCESS'
export const FETCH_LUVAT_START = 'FETCH_LUVAT_START'
export const FETCH_LUVAT_FAILURE = 'FETCH_LUVAT_FAILURE'

export function fetchLuvat() {
  

  return (dispatch) => {
    dispatch({ type: FETCH_LUVAT_START })

    const request = fetch(`${API_BASE_URL}/luvat`)

    request
      .then((response) => response.json())
      .then((data) => dispatch({ type: FETCH_LUVAT_SUCCESS, payload: data }))
      .catch((err) => dispatch({ type: FETCH_LUVAT_FAILURE, payload: err }))
  }
}