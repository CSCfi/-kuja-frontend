import { combineReducers } from 'redux'
import LuvatReducer from './LuvatReducer'

const rootReducer = combineReducers({
  luvat: LuvatReducer
})

export default rootReducer
