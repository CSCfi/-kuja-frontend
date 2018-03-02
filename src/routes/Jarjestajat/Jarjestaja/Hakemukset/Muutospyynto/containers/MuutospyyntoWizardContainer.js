import { connect } from 'react-redux'

import { fetchMuutosperustelut } from "../modules/muutosperustelut"
import { fetchLupa } from "../../../modules/lupa"
import { createMuutospyynto } from "../modules/muutospyynto"

import MuutospyyntoWizard from '../components/MuutospyyntoWizard'

const mapStateToProps = (state) => {
  return {
    muutosperustelut: state.muutosperustelut,
    lupa: state.lupa
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchMuutosperustelut: () => dispatch(fetchMuutosperustelut()),
    fetchLupa: (ytunnus, query) => dispatch(fetchLupa(ytunnus, query)),
    createMuutospyynto: (muutospyynto) => dispatch(createMuutospyynto(muutospyynto))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MuutospyyntoWizard)
