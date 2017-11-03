import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { logoutUser } from 'actions/LoginActions'

class Logout extends Component {
  componentDidMount() {
    this.props.logout()
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
    logout: () => dispatch(logoutUser())
  }
}

export default connect(null, mapDispatchToProps)(Logout)
