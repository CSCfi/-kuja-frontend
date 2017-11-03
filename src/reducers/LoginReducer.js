import { LOGIN_USER, LOGOUT_USER } from 'actions/LoginActions'

export default function(state = { user: null }, action) {
  switch (action.type) {
    case LOGIN_USER: {
      const user = {
        role: null,
        firstName: null,
        lastName: null
      }

      if (action.payload.role) {
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

    case LOGOUT_USER:
      return { user: null }

    default:
      return state
  }
}