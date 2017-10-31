import _ from 'lodash'
import { FETCH_LUVAT } from '../actions'

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_LUVAT:
      return _.mapKeys(action.payload, 'id')
    default:
      return state
  }
}
