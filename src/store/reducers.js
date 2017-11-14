import { combineReducers } from 'redux'
import luvatReducer from 'routes/Luvat/modules/luvat'
import userReducer from 'routes/Login/modules/user'
import { reducer as reduxFormReducer } from 'redux-form';

const rootReducer = combineReducers({
  luvat: luvatReducer,
  user: userReducer,
  form: reduxFormReducer
})

export default rootReducer
