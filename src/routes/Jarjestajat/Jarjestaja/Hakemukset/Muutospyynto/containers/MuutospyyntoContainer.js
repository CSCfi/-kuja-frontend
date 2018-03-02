import { connect } from 'react-redux'
import MuutosPyynto from '../components/Muutospyynto'

import { fetchMuutospyynnot} from "../../modules/muutospyynnot"
import { createMuutospyynto } from "../modules/muutospyynto"
import { fetchLupa } from "../../../modules/lupa"

const mapStateToProps = (state) => {
  return {
    lupa: state.lupa,
    muutospyynnot: state.muutospyynnot
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLupa: (ytunnus, query) => dispatch(fetchLupa(ytunnus, query)),
    fetchMuutospyynnot: (ytunnus, query) => dispatch(fetchMuutospyynnot(ytunnus, query)),
    createMuutospyynto: (data) => dispatch(createMuutospyynto(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MuutosPyynto)
