import React, { Component } from 'react'

import { Redirect } from 'react-router-dom'


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

export default Logout
