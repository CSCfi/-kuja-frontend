import { combineReducers } from 'redux'
import luvatReducer from 'routes/Luvat/modules/luvat'
import lupaReducer from 'routes/Luvat/Lupa/modules/lupa'
import userReducer from 'routes/Login/modules/user'
import { reducer as reduxFormReducer } from 'redux-form';

const rootReducer = combineReducers({
  luvat: luvatReducer,
  lupa: lupaReducer,
  user: userReducer,
  form: reduxFormReducer
})

export default rootReducer
