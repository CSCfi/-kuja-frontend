import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import { fetchLuvat } from '../actions'
import LuvatList from './LuvatList'

class Luvat extends Component {
  componentWillMount() {
    this.props.fetchLuvat()
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Lupavaranto | Oiva</title>
        </Helmet>
        <h4>LUVAT</h4>
        <LuvatList luvat={this.props.luvat}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { luvat: state.luvat }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLuvat: () => dispatch(fetchLuvat())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Luvat)
