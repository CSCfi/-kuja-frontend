import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { logoutUser } from 'actions/LoginActions'
import { CAS_LOGOUT_URL } from 'helpers/Constants'

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
