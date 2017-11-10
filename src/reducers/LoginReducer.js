import { 
  DUMMY_LOGIN_USER, 
  DUMMY_LOGOUT_USER, 
  LOGIN_GET_ROLES_START,
  LOGIN_GET_ROLES_SUCCESS,
  LOGIN_GET_ROLES_FAILURE,
  LOGOUT_USER_START
} from 'actions/LoginActions'

const initialState = {
  user: null,
  isFetching: false,
  fetched: false,
  hasErrored: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_GET_ROLES_START: {
      console.log('LoginReducer', action.type)
      return {
        ...state,
        isFetching: true,
        fetched: false,
        hasErrored: false
      }
    }

    case LOGIN_GET_ROLES_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        isFetching: false,
        fetched: true,
        hasErrored: false
      }
    }

    case LOGIN_GET_ROLES_FAILURE: {
      return {
        ...state,
        isFetching: false,
        fetched: false,
        hasErrored: true
      }
    }

    case LOGOUT_USER_START: {
      return {
        ...state,
        user: null
      }
    }

    case DUMMY_LOGIN_USER: {
      const user = {
        role: null,
        firstName: null,
        lastName: null
      }

      if (action.payload && action.payload.role) {
        switch (action.payload.role) {
          case 'esittelijä': {
            user.role = action.payload.role
            user.firstName = 'Essi'
            user.lastName = 'Esittelijä'
            break
          }

          case 'kj': {
            user.role = action.payload.role
            user.firstName = 'Kalle'
            user.lastName = 'Koulutuksenjärjestäjä'
            break
          }

          default:
            return null
        }
      }
      return { user }
    }

    case DUMMY_LOGOUT_USER:
      return { user: null }

    default:
      return state
  }
}