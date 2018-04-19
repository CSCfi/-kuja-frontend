import { connect } from 'react-redux'

import { fetchMuutosperustelut } from "../modules/valmisteluPerustelut"
import { createMuutospyynto, fetchMuutospyynto } from "../modules/valmistelu"
import { fetchLupa } from "../modules/voimassaolevaLupa"
import { fetchKoulutusalat } from "../modules/valmisteluKoulutusalat"
import { fetchKoulutuksetAll } from "../modules/valmisteluKoulutukset"
import { fetchPaatoskierrokset } from "../modules/valmisteluPaatoskierros"

import Valmistelu from '../components/Valmistelu'

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
        fetchKoulutusalat: () => dispatch(fetchKoulutusalat()),
        fetchKoulutuksetAll: () => dispatch(fetchKoulutuksetAll()),
        fetchPaatoskierrokset: () => dispatch(fetchPaatoskierrokset()),
        fetchMuutospyynto: (uuid) => dispatch(fetchMuutospyynto(uuid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Valmistelu)