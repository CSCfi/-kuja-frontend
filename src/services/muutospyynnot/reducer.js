import {
  LOGIN_GET_ROLES_START,
  LOGIN_GET_ROLES_SUCCESS,
  LOGIN_GET_ROLES_FAILURE,
  LOGOUT_USER_START,
  GET_ORGANISATION_START,
  GET_ORGANISATION_SUCCESS,
  GET_ORGANISATION_FAILURE
} from "./actions";

const initialState = {
  user: {},
  isFetching: false,
  fetched: false,
  hasErrored: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_GET_ROLES_START:
      return {
        ...state,
        isFetching: true,
        fetched: false,
        hasErrored: false
      };
    case LOGIN_GET_ROLES_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isFetching: false,
        fetched: true,
        hasErrored: false
      };
    case LOGIN_GET_ROLES_FAILURE:
      return {
        ...state,
        isFetching: false,
        fetched: false,
        hasErrored: true
      };
    case GET_ORGANISATION_START:
      return {
        ...state,
        oppilaitos: {
          isFetching: true,
          fetched: false,
          hasErrored: false
        }
      };
    case GET_ORGANISATION_SUCCESS:
      return {
        ...state,
        oppilaitos: {
          organisaatio: action.payload,
          isFetching: false,
          fetched: true,
          hasErrored: false
        }
      };
    case GET_ORGANISATION_FAILURE:
      return {
        ...state,
        oppilaitos: {
          isFetching: true,
          fetched: false,
          hasErrored: false
        }
      };
    case LOGOUT_USER_START:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}
