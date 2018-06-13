import { connect } from 'react-redux'

import { fetchMuutosperustelut } from "../modules/valmisteluPerustelut"
import { createMuutospyynto, fetchMuutospyynto } from "../modules/valmistelu"
import { fetchLupa } from "../modules/voimassaolevaLupa"
import { fetchKohteet } from "../../../../modules/reducers/kohde"
import { fetchKoulutusalat } from "../../../../modules/reducers/koulutusalat"
import { fetchKoulutuksetAll, fetchKoulutuksetMuut, fetchKoulutus } from "../../../../modules/reducers/koulutukset"
import { fetchPaatoskierrokset } from "../../../../modules/reducers/paatoskierrokset"

import ValmisteluWizard from '../components/ValmisteluWizard'

const mapStateToProps = (state) => {
  return {
    muutosperustelut: state.muutosperustelut,
    lupa: state.lupa,
    koulutukset: state.koulutukset,
    koulutusalat: state.koulutusalat,
    paatoskierrokset: state.paatoskierrokset,
    muutospyynto: state.muutospyynto
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchMuutosperustelut: () => dispatch(fetchMuutosperustelut()),
    fetchLupa: (uuid, query) => dispatch(fetchLupa(uuid, query)),
    createMuutospyynto: (muutospyynto) => dispatch(createMuutospyynto(muutospyynto)),
    fetchKoulutusalat: () => dispatch(fetchKoulutusalat()),
    fetchKoulutuksetAll: () => dispatch(fetchKoulutuksetAll()),
    fetchKoulutuksetMuut: (koodisto) => dispatch(fetchKoulutuksetMuut(koodisto)),
    fetchKoulutus: (koodi) => dispatch(fetchKoulutus(koodi)),
    fetchPaatoskierrokset: () => dispatch(fetchPaatoskierrokset()),
    fetchMuutospyynto: (uuid) => dispatch(fetchMuutospyynto(uuid)),
    fetchKohteet: () => dispatch(fetchKohteet())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ValmisteluWizard)