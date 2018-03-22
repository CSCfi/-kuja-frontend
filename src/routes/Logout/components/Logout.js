import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logoutUser } from 'routes/Login/modules/user'

class Logout extends Component {
    componentWillMount() {
        this.props.logoutUser()
    }

    render() {
        return (
            <div>
              <p>Olet kirjautunut ulos.</p>

                {sessionStorage.getItem('username')}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { user: state.user }
}

function mapDispatchToProps(dispatch) {
    return {
        logoutUser: () => dispatch(logoutUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)