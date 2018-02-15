import { connect } from 'react-redux'
import Jarjestamislupa from '../components/Jarjestamislupa'


const mapStateToProps = (state) => {
  return { lupa: state.lupa }
}

export default connect(mapStateToProps)(Jarjestamislupa)
