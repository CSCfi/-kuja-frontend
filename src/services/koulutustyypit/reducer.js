import {
  FETCH_KOULUTUSTYYPIT_START,
  FETCH_KOULUTUSTYYPIT_SUCCESS,
  FETCH_KOULUTUSTYYPIT_FAILURE
} from "./actionTypes";

const initialState = {
  isFetching: false,
  fetched: false,
  hasErrored: false,
  data: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_KOULUTUSTYYPIT_START:
      return {
        ...state,
        isFetching: true,
        fetched: false,
        hasErrorer: false
      };
    case FETCH_KOULUTUSTYYPIT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        hasErrored: false,
        data: action.payload
      };
    case FETCH_KOULUTUSTYYPIT_FAILURE:
      return {
        ...state,
        isFetching: false,
        fetched: false,
        hasErrored: true
      };
  }
}
