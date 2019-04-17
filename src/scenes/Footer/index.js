import { connect } from "react-redux";

import Footer from "./components/Footer";

const mapStateToProps = ({ user }) => ({
  user: user.user
});

export default connect(
  mapStateToProps,
  null,
  null,
  { pure: false }
)(Footer);
