import { connect } from 'react-redux'

import { fetchLupaHistory } from '../modules/history'
import LupaHistory from '../components/LupaHistory'


const mapStateToProps = (state) => {
  return { lupaHistory: state.lupaHistory }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchLupaHistory: (oid) => dispatch(fetchLupaHistory(oid))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LupaHistory)
