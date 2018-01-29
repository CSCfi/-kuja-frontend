import { connect } from 'react-redux'

import { fetchLupa } from '../modules/lupa'
import Jarjestaja from '../components/Jarjestaja'


const mapStateToProps = (state) => {
  return { lupa: state.lupa }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchLupa: (id, query) => dispatch(fetchLupa(id, query))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Jarjestaja)
