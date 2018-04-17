import { connect } from 'react-redux'

import TutkinnotMuutos from '../components/TutkinnotMuutos'
import { clearToBeRemoved, toggleLupaSectionIsRemoving } from '../../../Jarjestajat/Jarjestaja/Hakemukset/modules/muutokset'

const mapStateToProps = (state) => {
    return { muutokset: state.muutokset }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleLupaSectionIsRemoving: () => dispatch(toggleLupaSectionIsRemoving()),
        clearToBeRemoved: () => dispatch(clearToBeRemoved())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TutkinnotMuutos)
