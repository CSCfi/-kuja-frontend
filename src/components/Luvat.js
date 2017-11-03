import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import { fetchLuvat } from 'actions/LupaActions'
import LuvatList from 'components/LuvatList'

class Luvat extends Component {
  componentWillMount() {
    this.props.fetchLuvat()
  }

  render() {
    if (this.props.luvat.fetched) {
      return (
        <div>
          <Helmet>
            <title>Lupavaranto | Oiva</title>
          </Helmet>
          <h4>LUVAT</h4>  
          <LuvatList luvat={this.props.luvat.luvat}/>
        </div>
      )
    } else if (this.props.isFetching) {
        return <div>Ladataan...</div>
    } else if (this.props.hasErrored) {
      return <div>Lupia ladattaessa tapahtui virhe</div>
    } else {
      return null
    }
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
