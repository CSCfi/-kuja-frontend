import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { dummyLogoutUser } from 'actions/LoginActions'

class Logout extends Component {
  componentDidMount() {
    this.props.dummyLogout()
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
    dummyLogout: () => dispatch(dummyLogoutUser())
  }
}

export default connect(null, mapDispatchToProps)(Logout)
