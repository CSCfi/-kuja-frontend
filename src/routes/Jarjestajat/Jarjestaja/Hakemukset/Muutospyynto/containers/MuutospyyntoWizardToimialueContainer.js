import { connect } from 'react-redux'

import { fetchKunnat } from "../modules/kunnat"
import { fetchMaakunnat } from "../modules/maakunnat"

import MuutospyyntoWizardToimialue from '../components/MuutospyyntoWizardToimialue'

const mapStateToProps = (state) => {
  return {
    kunnat: state.kunnat,
    maakunnat: state.maakunnat
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchKunnat: () => dispatch(fetchKunnat()),
    fetchMaakunnat: () => dispatch(fetchMaakunnat())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MuutospyyntoWizardToimialue)
