import { connect } from 'react-redux'

import { fetchMuutospyynnotForEsittelija } from "routes/Asiat/modules/muutospyynnot"
import PaatetytAsiat from "../components/PaatetytAsiat";

const mapStateToProps = (state) => {
    return {
        muutospyynnot: state.muutospyynnot,
        lupa: state.lupa
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMuutospyynnotForEsittelija: (esittelija, query) => dispatch(fetchMuutospyynnotForEsittelija(esittelija, query))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaatetytAsiat)