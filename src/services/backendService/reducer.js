import {
  FETCH_FROM_BACKEND_FAILED,
  FETCH_FROM_BACKEND_IS_ON,
  FETCH_FROM_BACKEND_SUCCESS
} from "./actionTypes";
import * as R from "ramda";
import moment from "moment";

function getNextState(key, subKey, _path, data, state) {
  const path = _path || [key, subKey].filter(Boolean);
  return R.assocPath(path, data, state);
}

export default function(state, action) {
  switch (action.type) {
    case FETCH_FROM_BACKEND_FAILED:
      return getNextState(
        action.key,
        action.subKey,
        action.path,
        {
          status: "erroneous"
        },
        state
      );
    case FETCH_FROM_BACKEND_IS_ON:
      return getNextState(
        action.key,
        action.subKey,
        action.path,
        {
          status: "fetching"
        },
        state
      );
    case FETCH_FROM_BACKEND_SUCCESS:
      const nextState = getNextState(
        action.key,
        action.subKey,
        action.path,
        {
          raw: action.data,
          status: "ready",
          fetchedAt: moment().format("DD.MM.YYYY HH:mm:ss")
        },
        state
      );
      return nextState;
    default:
      return state;
  }
}
