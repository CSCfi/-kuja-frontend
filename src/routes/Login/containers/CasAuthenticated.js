import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getRoles } from 'routes/Login/modules/user'

class CasAuthenticated extends Component {
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

export default connect(null, mapDispatchToProps)(CasAuthenticated)
