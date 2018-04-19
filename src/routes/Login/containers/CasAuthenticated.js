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
        {this.props.user.hasErrored ? <p>Kirjautumisessa tapahtui virhe</p> : <p>Kirjautuminen onnistui! Tervetuloa Oiva-palveluun {sessionStorage.getItem('username')}</p>}



        </div>
    )
  }
}

function mapStateToProps(state) {
  return { user: state.user }
}

function mapDispatchToProps(dispatch) {
  return {
    getRoles: () => dispatch(getRoles())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CasAuthenticated)
