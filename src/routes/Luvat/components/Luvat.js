import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

import LuvatList from 'routes/Luvat/components/LuvatList'

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

export default Luvat
