import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { logout } from '../actions'

class SignOut extends Component {
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
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(SignOut)
