import { connect } from 'react-redux'
import Hakemus from '../components/Hakemus'


const mapStateToProps = (state) => {
  return { lupa: state.lupa }
}

export default connect(mapStateToProps)(Hakemus)
