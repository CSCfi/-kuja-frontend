import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Login from "../Login";
import Logout from "../Logout";
import { Route } from "react-router-dom";
import { APP_WIDTH } from "modules/styles";
import { RoutesContainer } from "modules/elements";
import CasAuthenticated from "scenes/CasAuthenticated";
import RequireCasAuth from "scenes/Login/services/RequireCasAuth";
import DestroyCasAuth from "scenes/Logout/services/DestroyCasAuth";

const App = () => (
  <div>
    <header>
      <Header maxWidth={`${APP_WIDTH}`} />
    </header>

    <main>
      <RoutesContainer>
        {<Route path="/cas-auth" component={RequireCasAuth} />}
        {<Route path="/cas-ready" component={CasAuthenticated} />}
        {<Route path="/cas-logout" component={DestroyCasAuth} />}
        {<Route path="/kirjaudu" component={Login} />}
        {<Route path="/logout" component={Logout} />}
      </RoutesContainer>
    </main>

    <footer>
      <Footer maxWidth={`${APP_WIDTH}`} />
    </footer>
  </div>
);

export default App;
