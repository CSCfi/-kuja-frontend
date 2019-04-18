import React from "react";
import Login from "scenes/Login";
import Logout from "scenes/Logout";
import Header from "scenes/Header";
import Footer from "scenes/Footer";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import { COLORS } from "./modules/styles";
import { APP_WIDTH } from "modules/styles";
import { render, NavLink } from "react-dom";
import Jarjestajat from "scenes/Jarjestajat";
import Home from "scenes/Home/components/Home";
import CasAuthenticated from "scenes/CasAuthenticated";
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "./configureStore";
import Tilastot from "./scenes/Tilastot/components/Tilastot";
import RequireCasAuth from "scenes/Login/services/RequireCasAuth";
import DestroyCasAuth from "scenes/Logout/services/DestroyCasAuth";
import Lukiokoulutus from "./scenes/Lukiokoulutus/components/Lukiokoulutus";
import { BreadcrumbsContainer } from "./modules/elements";
import { BreadcrumbsProvider, Breadcrumbs } from "react-breadcrumbs-dynamic";
import EsiJaPerusopetus from 'scenes/EsiJaPerusopetus/components/EsiJaPerusopetus'
import VapaaSivistystyo from "./scenes/VapaaSivistystyo/components/VapaaSivistystyo";
// import JarjestajaSwitch from "scenes/Jarjestajat/Jarjestaja/components/JarjestajaSwitch";

import "./css/tailwind.css";

render(
  <Provider store={configureStore()}>
    <BreadcrumbsProvider>
      <ConnectedRouter history={history}>
        <div className="flex flex-col min-h-screen">
          <header>
            <Header maxWidth={`${APP_WIDTH}`} />
          </header>

          <main className="flex-1">
            <BreadcrumbsContainer>
              <Breadcrumbs
                separator={<b> / </b>}
                item={NavLink}
                finalItem={"b"}
                finalProps={{
                  style: {
                    color: COLORS.BLACK
                  }
                }}
              />
            </BreadcrumbsContainer>
            <div className="flex flex-1 flex-col">
              {<Route exact path="/" component={Home} />}
              {<Route path="/logout" component={Logout} />}
              {<Route path="/kirjaudu" component={Login} />}
              {<Route exact path="/tilastot" component={Tilastot} />}              
              {<Route path="/cas-auth" component={RequireCasAuth} />}
              {<Route path="/cas-logout" component={DestroyCasAuth} />}
              {<Route path="/cas-ready" component={CasAuthenticated} />}
              {<Route exact path="/jarjestajat" component={Jarjestajat} />}
              {<Route exact path="/lukiokoulutus" component={Lukiokoulutus} />}
              {<Route exact path="/vapaa-sivistystyo" component={VapaaSivistystyo} />}
              {<Route exact path="/esi-ja-perusopetus" component={EsiJaPerusopetus} />}
              {/* {<Route exact path="/jarjestajat/:ytunnus" component={JarjestajaSwitch} />} */}
            </div>
          </main>

          <footer>
            <Footer maxWidth={`${APP_WIDTH}`} />
          </footer>
        </div>
      </ConnectedRouter>
    </BreadcrumbsProvider>
  </Provider>,
  document.getElementById("root")
);
