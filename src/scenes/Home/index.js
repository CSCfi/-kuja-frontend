import React from "react";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const Home = () => <div>This is home.</div>;

// const mapStateToProps = ({ user }) => ({
//   user: user.user
// })

// const mapDispatchToProps = dispatch => bindActionCreators({
//   changePage: () => push('/about-us')
// }, dispatch)

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Home)

export default Home;
