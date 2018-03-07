import { connect } from 'react-redux'
import Tutkinto from '../components/Tutkinto'

import { removeTutkinto, undoRemoveTutkinto } from "../Hakemukset/modules/muutokset"

const mapStateToProps = (state) => {
  return {
    lupa: state.lupa,
    muutokset: state.muutokset
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeTutkinto: (tutkinto) => dispatch(removeTutkinto(tutkinto)),
    undoRemoveTutkinto: (tutkinto) => dispatch(undoRemoveTutkinto(tutkinto))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tutkinto)
