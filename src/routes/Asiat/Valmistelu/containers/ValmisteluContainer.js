import { connect } from 'react-redux'
import Valmistelu from '../components/Valmistelu'

import { fetchMuutospyynto} from "../modules/valmistelu"
//import { updateMuutospyynto } from "../modules/muutospyynto"
import { fetchLupa } from "../modules/voimassaolevaLupa"

const mapStateToProps = (state) => {
    return {
        lupa: state.lupa,
        muutospyynto: state.muutospyynto
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchLupa: (ytunnus, query) => dispatch(fetchLupa(ytunnus, query)),
        fetchMuutospyynto: (uuid) => dispatch(fetchMuutospyynto(uuid)),
        //updateMuutospyynto: (data) => dispatch(updateMuutospyynto(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Valmistelu)
