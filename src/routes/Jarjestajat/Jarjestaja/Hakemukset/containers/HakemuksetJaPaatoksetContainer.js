import { connect } from 'react-redux'

import HakemuksetJaPaatokset from '../components/HakemuksetJaPaatokset'
import { fetchMuutospyynnot } from "../modules/muutospyynnot"

const mapStateToProps = (state) => {
  return { muutospyynnot: state.muutospyynnot }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMuutospyynnot: (ytunnus, query) => dispatch(fetchMuutospyynnot(ytunnus, query))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HakemuksetJaPaatokset)
