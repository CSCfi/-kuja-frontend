import { connect } from 'react-redux'

import Header from './components/Header'

const mapStateToProps = (state) => {
  return { user: state.user.user }
}

export default connect(mapStateToProps, null, null, { pure: false })(Header)
