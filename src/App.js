import React, { useContext, useEffect } from "react";
import { Route, Router, Switch } from "react-router-dom";
import Login from "scenes/Login/Login";
import Logout from "scenes/Logout/Logout";
import Footer from "scenes/Footer/Footer";
import Jarjestajat from "./scenes/Jarjestajat/Jarjestajat";
import { COLORS } from "./modules/styles";
import { APP_WIDTH } from "modules/styles";
import Home from "scenes/Home/components/Home";
import CasAuthenticated from "scenes/CasAuthenticated/CasAuthenticated";
import Tilastot from "./scenes/Tilastot/components/Tilastot";
import RequireCasAuth from "scenes/Login/services/RequireCasAuth";
import DestroyCasAuth from "scenes/Logout/services/DestroyCasAuth";
import Lukiokoulutus from "./scenes/Lukiokoulutus/components/Lukiokoulutus";
import { Breadcrumbs } from "react-breadcrumbs-dynamic";
import EsiJaPerusopetus from "scenes/EsiJaPerusopetus/components/EsiJaPerusopetus";
import VapaaSivistystyo from "./scenes/VapaaSivistystyo/components/VapaaSivistystyo";
import JarjestajaSwitch from "scenes/Jarjestajat/Jarjestaja/components/JarjestajaSwitch";
import { NavLink } from "react-dom";
import { createBrowserHistory } from "history";
import { UserContext } from "./context/userContext";
import { getRoles } from "services/kayttajat/actions";
import { JarjestajatProvider } from "./context/jarjestajatContext";
import { LuvatProvider } from "./context/luvatContext";
import { MuutospyynnotProvider } from "./context/muutospyynnotContext";
import ButtonAppBar from "./components/02-organisms/ButtonAppBar";
import Navigation from "./components/02-organisms/Navigation";
import { MEDIA_QUERIES } from "./modules/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { ROLE_ESITTELIJA } from "./modules/constants";

const history = createBrowserHistory();

const App = () => {
  const { state, dispatch } = useContext(UserContext);
  const breakpointTabletMin = useMediaQuery(MEDIA_QUERIES.TABLET_MIN);
  const ytunnus =
    state.oppilaitos && state.oppilaitos.organisaatio
      ? state.oppilaitos.organisaatio.ytunnus
      : false;
  const pageLinks = [
    // { path: "/", text: "Etusivu", isExact: true },
    {
      path: "/esi-ja-perusopetus",
      text: "Esi- ja perusopetus",
      isExact: false
    },
    { path: "/lukiokoulutus", text: "Lukiokoulutus" },
    { path: "/jarjestajat", text: "Ammatillinen koulutus" },
    { path: "/vapaa-sivistystyo", text: "Vapaa sivistystyö" },
    { path: "/tilastot", text: "Tilastot" }
  ];

  if (sessionStorage.getItem("role") === ROLE_ESITTELIJA) {
    pageLinks.push({
      path: "/asiat",
      text: "Asiat"
    });
  }

  useEffect(() => {
    getRoles()(dispatch);
  }, []);

  return (
    <Router history={history}>
      <div className="flex flex-col min-h-screen">
        <header>
          <ButtonAppBar
            ytunnus={ytunnus}
            user={state.user}
            oppilaitos={state.oppilaitos}
            dispatch={dispatch}
            pageLinks={pageLinks}
          />
          {breakpointTabletMin && (
            <Navigation ytunnus={ytunnus} pageLinks={pageLinks} />
          )}
        </header>

        <main className="flex flex-1 flex-col justify-between">
          <div className="flex-1 flex flex-col">
            <div className="mx-auto w-3/4 py-10">
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
            </div>
            <Switch>
              {<Route exact path="/" component={Home} />}
              {<Route path="/logout" component={Logout} />}
              {<Route path="/kirjaudu" component={Login} />}
              {<Route exact path="/tilastot" component={Tilastot} />}
              {<Route path="/cas-auth" component={RequireCasAuth} />}
              {<Route path="/cas-logout" component={DestroyCasAuth} />}
              {<Route path="/cas-ready" component={CasAuthenticated} />}
              {
                <Route
                  exact
                  path="/jarjestajat"
                  render={() => (
                    <JarjestajatProvider>
                      <Jarjestajat />
                    </JarjestajatProvider>
                  )}
                />
              }
              {<Route exact path="/lukiokoulutus" component={Lukiokoulutus} />}
              {
                <Route
                  exact
                  path="/vapaa-sivistystyo"
                  component={VapaaSivistystyo}
                />
              }
              {
                <Route
                  exact
                  path="/esi-ja-perusopetus"
                  component={EsiJaPerusopetus}
                />
              }
              {
                <Route
                  path="/jarjestajat/:ytunnus"
                  render={props => (
                    <LuvatProvider>
                      <MuutospyynnotProvider>
                        <JarjestajaSwitch {...props} />
                      </MuutospyynnotProvider>
                    </LuvatProvider>
                  )}
                />
              }
            </Switch>
          </div>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
};

export default App;
