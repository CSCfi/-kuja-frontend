import { connect } from 'react-redux'

import { fetchMuut } from "../modules/muut"

import MuutospyyntoWizardMuut from '../components/MuutospyyntoWizardMuut'

const mapStateToProps = (state) => {
  return {
    muut: state.muut
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchMuut: () => dispatch(fetchMuut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MuutospyyntoWizardMuut)
