import { connect } from 'react-redux'
import Valmistelu from '../components/Valmistelu'

import { fetchMuutospyynto} from "../modules/muutospyynto"
//import { updateMuutospyynto } from "../modules/muutospyynto"
import { fetchLupa } from "../../../Jarjestajat/Jarjestaja/modules/lupa"

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
