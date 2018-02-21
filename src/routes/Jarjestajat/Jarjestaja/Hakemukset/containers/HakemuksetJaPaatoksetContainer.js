import { connect } from 'react-redux'

import HakemuksetJaPaatokset from '../components/HakemuksetJaPaatokset'
import { fetchHakemukset } from "../modules/hakemukset"

const mapStateToProps = (state) => {
  return { hakemukset: state.hakemukset }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchHakemukset: (ytunnus, query) => dispatch(fetchHakemukset(ytunnus, query))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HakemuksetJaPaatokset)
