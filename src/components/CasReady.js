import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getRoles } from 'actions/LoginActions'

class CasReady extends Component {
  componentWillMount() {    
    this.props.getRoles()
  }

  render() {
    return (
      <div>
        <p>CAS-autentikointi valmis</p>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getRoles: () => dispatch(getRoles())
  }
}

export default connect(null, mapDispatchToProps)(CasReady)
