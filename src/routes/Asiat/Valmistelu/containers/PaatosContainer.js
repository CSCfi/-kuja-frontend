import { connect } from 'react-redux'

import Paatos from '../components/Paatos'
import { fetchMuutosperustelut } from "../modules/muutosperustelut"

const mapStateToProps = (state) => {
    return {
        muutosperustelut: state.muutosperustelut
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMuutosperustelut: () => dispatch(fetchMuutosperustelut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Paatos)
