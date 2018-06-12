import { connect } from 'react-redux'

import { fetchMuutosperustelut } from "../modules/valmisteluPerustelut"
import { createMuutospyynto, fetchMuutospyynto } from "../modules/valmistelu"
import { fetchLupa } from "../modules/voimassaolevaLupa"
import { fetchKoulutusalat } from "../modules/valmisteluKoulutusalat"
import { fetchKoulutuksetAll } from "../modules/valmisteluKoulutukset"
import { fetchPaatoskierrokset } from "../modules/valmisteluPaatoskierros"

import Valmistelu from '../components/ValmisteluWizard'

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
        fetchLupa: (uuid, query) => dispatch(fetchLupa(uuid, query)),
        createMuutospyynto: (muutospyynto) => dispatch(createMuutospyynto(muutospyynto)),
        fetchKoulutusalat: () => dispatch(fetchKoulutusalat()),
        fetchKoulutuksetAll: () => dispatch(fetchKoulutuksetAll()),
        fetchPaatoskierrokset: () => dispatch(fetchPaatoskierrokset()),
        fetchMuutospyynto: (uuid) => dispatch(fetchMuutospyynto(uuid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Valmistelu)