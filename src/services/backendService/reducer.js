import {
  FETCH_FROM_BACKEND_FAILED,
  FETCH_FROM_BACKEND_IS_ON,
  FETCH_FROM_BACKEND_SUCCESS
} from "./actionTypes";

export default function(state, action) {
  switch (action.type) {
    case FETCH_FROM_BACKEND_FAILED:
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          status: "erroneous",
          response: action.response
        }
      };
    case FETCH_FROM_BACKEND_IS_ON:
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          status: "fetching"
        }
      };
    case FETCH_FROM_BACKEND_SUCCESS:
      const nextState = {
        ...state,
        [action.key]: {
          ...state[action.key],
          raw: action.data,
          status: "ready",
          fetched: new Date().toUTCString()
        }
      };
      return nextState;
    default:
      return state;
  }
}
