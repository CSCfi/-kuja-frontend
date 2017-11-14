import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { logoutUser } from 'routes/Login/modules/user'
import { CAS_LOGOUT_URL } from 'modules/constants'

class Logout extends Component {
  componentDidMount() {
    this.props.logoutUser()
    window.location = CAS_LOGOUT_URL
  }

  render() {
    return (
      <div>
        <Redirect to="/" />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser())
  }
}

export default connect(null, mapDispatchToProps)(Logout)
