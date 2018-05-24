import { connect } from 'react-redux'

import { fetchKunnat } from "../modules/kunnat"
import { fetchMaakunnat } from "../modules/maakunnat"
import { fetchMaakuntakunnat } from "../modules/maakuntakunnat"

import MuutospyyntoWizardToimialue from '../components/MuutospyyntoWizardToimialue'

const mapStateToProps = (state) => {
  return {
    kunnat: state.kunnat,
    maakunnat: state.maakunnat,
    maakuntakunnat: state.maakuntakunnat
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchKunnat: () => dispatch(fetchKunnat()),
    fetchMaakunnat: () => dispatch(fetchMaakunnat()),
    fetchMaakuntakunnat: () => dispatch(fetchMaakuntakunnat())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MuutospyyntoWizardToimialue)
