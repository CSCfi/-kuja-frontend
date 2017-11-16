import { connect } from 'react-redux'

import { logoutUser } from 'routes/Login/modules/user'
import Logout from '../components/Logout'

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser())
  }
}

export default connect(null, mapDispatchToProps)(Logout)
