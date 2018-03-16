import { connect } from 'react-redux'

import { fetchLupa } from '../modules/lupa'
import { fetchMuutospyynnot } from "../Hakemukset/modules/muutospyynnot"
import Jarjestaja from '../components/Jarjestaja'


const mapStateToProps = (state) => {
  return {
    lupa: state.lupa,
    muutospyynnot: state.muutospyynnot,
      user: state.user.user
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchLupa: (ytunnus, query) => dispatch(fetchLupa(ytunnus, query)),
    fetchMuutospyynnot: (ytunnus, query) => dispatch(fetchMuutospyynnot(ytunnus, query))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Jarjestaja)
