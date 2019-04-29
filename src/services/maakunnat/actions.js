import { API_BASE_URL } from "modules/constants";

export function fetchMaakunnat() {
    return dispatch => {
      dispatch({ type: FETCH_MAAKUNNAT_START });
  
      const request = fetch(`${API_BASE_URL}/koodistot/maakunnat`);
  
      request
        .then(response => response.json())
        .then(data => {
          dispatch({ type: FETCH_MAAKUNNAT_SUCCESS, payload: data });
        })
        .catch(err => {
          dispatch({ type: FETCH_MAAKUNNAT_FAILURE, payload: err });
        });
    };
  }