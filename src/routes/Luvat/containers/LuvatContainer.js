import { connect } from 'react-redux'

import { fetchLuvat } from 'routes/Luvat/modules/luvat'
import Luvat from '../components/Luvat'

const mapStateToProps = (state) => {
  return { luvat: state.luvat }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLuvat: () => dispatch(fetchLuvat())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Luvat)
