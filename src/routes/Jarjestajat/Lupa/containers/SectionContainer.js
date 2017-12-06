import { connect } from 'react-redux'

import Section from '../components/Section'

const mapStateToProps = (state) => {
  return { lupa: state.lupa }
}

export default connect(mapStateToProps)(Section)
