import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'

import LuvatList from 'routes/Jarjestajat/components/LuvatList'
import { P } from 'modules/styles'

class Jarjestajat extends Component {
  componentWillMount() {
    this.props.fetchLuvat()
  }

  render() {
    if (this.props.luvat.fetched) {
      console.log(this.props.luvat.luvat)
      return (
        <div>
          <Helmet>
            <title>Lupavaranto | Oiva</title>
          </Helmet>
          <BreadcrumbsItem to='/'>Etusivu</BreadcrumbsItem>
          <BreadcrumbsItem to='/jarjestajat'>Koulutuksen järjestäjät</BreadcrumbsItem>
          <h1>Koulutuksen järjestäjät</h1>
          <P>Voimassa olevat koulutuksen järjestämisluvat ({Object.keys(this.props.luvat.luvat).length} kpl)</P>
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

export default Jarjestajat
