import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Home from "../Home/components/Home";
import Jarjestajat from "../Jarjestajat";
import Login from "../Login";
import Logout from "../Logout";
import { Route } from "react-router-dom";
import { APP_WIDTH } from "modules/styles";
import CasAuthenticated from "scenes/CasAuthenticated";
import RequireCasAuth from "scenes/Login/services/RequireCasAuth";
import DestroyCasAuth from "scenes/Logout/services/DestroyCasAuth";

const App = () => (
  <div className="flex flex-col min-h-screen">
    <header>
      <Header maxWidth={`${APP_WIDTH}`} />
    </header>

    <main className="flex flex-1">
      {<Route path="/cas-auth" component={RequireCasAuth} />}
      {<Route path="/cas-ready" component={CasAuthenticated} />}
      {<Route path="/cas-logout" component={DestroyCasAuth} />}
      {<Route exact path="/" component={Home} />}
      {<Route path="/kirjaudu" component={Login} />}
      {<Route path="/logout" component={Logout} />}
      {<Route exact path="/jarjestajat" component={Jarjestajat} />}
    </main>

    <footer>
      <Footer maxWidth={`${APP_WIDTH}`} />
    </footer>
  </div>
);

export default App;
