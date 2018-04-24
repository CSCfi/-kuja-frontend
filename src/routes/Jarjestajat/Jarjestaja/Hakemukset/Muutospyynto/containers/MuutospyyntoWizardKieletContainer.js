import { connect } from 'react-redux'

import { fetchOppilaitoksenopetuskielet } from "../modules/oppilaitoksenopetuskielet"

import MuutospyyntoWizardKielet from '../components/MuutospyyntoWizardKielet'

const mapStateToProps = (state) => {
  return {
    oppilaitoksenopetuskielet: state.oppilaitoksenopetuskielet
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchOppilaitoksenopetuskielet: () => dispatch(fetchOppilaitoksenopetuskielet())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MuutospyyntoWizardKielet)
