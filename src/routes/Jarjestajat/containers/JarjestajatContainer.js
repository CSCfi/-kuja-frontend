import { connect } from 'react-redux'

import { fetchLuvat } from 'routes/Jarjestajat/modules/luvat'
import Jarjestajat from '../components/Jarjestajat'

const mapStateToProps = (state) => {
  return { luvat: state.luvat
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLuvat: () => dispatch(fetchLuvat())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Jarjestajat)
