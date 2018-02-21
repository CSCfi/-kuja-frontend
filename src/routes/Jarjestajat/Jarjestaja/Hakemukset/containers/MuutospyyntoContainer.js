import { connect } from 'react-redux'
import MuutosPyynto from '../components/Muutospyynto'


const mapStateToProps = (state) => {
  return { lupa: state.lupa }
}

export default connect(mapStateToProps)(MuutosPyynto)
