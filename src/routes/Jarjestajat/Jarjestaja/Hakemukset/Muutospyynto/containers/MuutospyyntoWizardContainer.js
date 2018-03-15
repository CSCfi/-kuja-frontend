import { connect } from 'react-redux'

import { fetchMuutosperustelut } from "../modules/muutosperustelut"
import { fetchLupa } from "../../../modules/lupa"
import { createMuutospyynto } from "../modules/muutospyynto"
import { fetchKoulutusalat } from "../modules/koulutusalat"
import { fetchKoulutukset } from "../modules/koulutukset"
import { fetchPaatoskierrokset } from "../modules/paatoskierrokset"

import MuutospyyntoWizard from '../components/MuutospyyntoWizard'

const mapStateToProps = (state) => {
  return {
    muutosperustelut: state.muutosperustelut,
    lupa: state.lupa,
    koulutukset: state.koulutukset,
    paatoskierrokset: state.paatoskierrokset
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchMuutosperustelut: () => dispatch(fetchMuutosperustelut()),
    fetchLupa: (ytunnus, query) => dispatch(fetchLupa(ytunnus, query)),
    createMuutospyynto: (muutospyynto) => dispatch(createMuutospyynto(muutospyynto)),
    fetchKoulutusalat: () => dispatch(fetchKoulutusalat()),
    fetchKoulutukset: (koodiarvo, metadata) => dispatch(fetchKoulutukset(koodiarvo, metadata)),
    fetchPaatoskierrokset: () => dispatch(fetchPaatoskierrokset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MuutospyyntoWizard)
