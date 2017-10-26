export const FETCH_LUVAT = 'fetch_luvat'

const BASE_URL = 'http://localhost:8099/api'

export function fetchLuvat() {
  const request = fetch(`${BASE_URL}/luvat`)

  return (dispatch) => {
    request
      .then((response) => response.json())
      .then((data) => dispatch({ type: FETCH_LUVAT, payload: data }))
  }
}
