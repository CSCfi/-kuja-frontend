import { connect } from 'react-redux'

import { fetchMuutosperustelut } from "../modules/muutosperustelut"
import { fetchLupa } from "../../../modules/lupa"
import { createMuutospyynto, saveMuutospyynto } from "../modules/muutospyynto"
import { previewMuutospyynto } from "../modules/muutospyynto"
import { fetchKoulutusalat } from "../modules/koulutusalat"
import { fetchKoulutuksetAll, fetchKoulutuksetMuut, fetchKoulutus } from "../modules/koulutukset"
import { fetchPaatoskierrokset } from "../modules/paatoskierrokset"

import MuutospyyntoWizard from '../components/MuutospyyntoWizard'

const mapStateToProps = (state) => {
  return {
    muutosperustelut: state.muutosperustelut,
    lupa: state.lupa,
    koulutukset: state.koulutukset,
    paatoskierrokset: state.paatoskierrokset,
    muutospyynto: state.muutospyynto
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchMuutosperustelut: () => dispatch(fetchMuutosperustelut()),
    fetchLupa: (ytunnus, query) => dispatch(fetchLupa(ytunnus, query)),
    createMuutospyynto: (muutospyynto) => dispatch(createMuutospyynto(muutospyynto)),
    saveMuutospyynto: (muutospyynto) => dispatch(saveMuutospyynto(muutospyynto)),
    previewMuutospyynto: (muutospyynto) => dispatch(previewMuutospyynto(muutospyynto)),
    fetchKoulutusalat: () => dispatch(fetchKoulutusalat()),
    fetchKoulutuksetAll: () => dispatch(fetchKoulutuksetAll()),
    fetchKoulutuksetMuut: (koodisto) => dispatch(fetchKoulutuksetMuut(koodisto)),
    fetchKoulutus: (koodi) => dispatch(fetchKoulutus(koodi)),
    fetchPaatoskierrokset: () => dispatch(fetchPaatoskierrokset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MuutospyyntoWizard)
