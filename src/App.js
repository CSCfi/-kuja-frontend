import React, { useContext, useEffect, useMemo, useState } from "react";
import { Route, Router, Switch } from "react-router-dom";
import Login from "scenes/Login/Login";
import PropTypes from "prop-types";
import Logout from "scenes/Logout/Logout";
import Footer from "scenes/Footer/Footer";
import Jarjestajat from "./scenes/Jarjestajat/Jarjestajat";
import { COLORS } from "./modules/styles";
import Home from "scenes/Home/components/Home";
import CasAuthenticated from "scenes/CasAuthenticated/CasAuthenticated";
import Tilastot from "./scenes/Tilastot/components/Tilastot";
import RequireCasAuth from "./scenes/Login/services/RequireCasAuth";
import DestroyCasAuth from "./scenes/Logout/services/DestroyCasAuth";
import Lukiokoulutus from "./scenes/Lukiokoulutus/components/Lukiokoulutus";
import { Breadcrumbs } from "react-breadcrumbs-dynamic";
import EsiJaPerusopetus from "./scenes/EsiJaPerusopetus/components/EsiJaPerusopetus";
import VapaaSivistystyo from "./scenes/VapaaSivistystyo/components/VapaaSivistystyo";
import JarjestajaSwitch from "./scenes/Jarjestajat/Jarjestaja/components/JarjestajaSwitch";
import { NavLink } from "react-dom";
import { createBrowserHistory } from "history";
import { JarjestajatProvider } from "./context/jarjestajatContext";
import { BackendContext } from "./context/backendContext";
import ButtonAppBar from "./components/02-organisms/ButtonAppBar";
import Navigation from "./components/02-organisms/Navigation";
import { MEDIA_QUERIES } from "./modules/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ReactResizeDetector from "react-resize-detector";
import { loadProgressBar } from "axios-progress-bar";
import { injectIntl } from "react-intl";
import commonMessages from "./i18n/definitions/common";
import educationMessages from "./i18n/definitions/education";
import { ToastContainer } from "react-toastify";
import {
  ROLE_ESITTELIJA,
  ROLE_KATSELIJA,
  ROLE_KAYTTAJA,
  ROLE_NIMENKIRJOITTAJA,
  ROLE_YLLAPITAJA
} from "./modules/constants";
import * as R from "ramda";
import _ from "lodash"; // TODO: Get rid of this.

import "axios-progress-bar/dist/nprogress.css";
import FetchHandler from "./FetchHandler";

loadProgressBar();

const history = createBrowserHistory();

const App = ({ intl, user }) => {
  const { state: fromBackend = {}, dispatch } = useContext(BackendContext);

  const breakpointTabletMin = useMediaQuery(MEDIA_QUERIES.TABLET_MIN);
  const [headerHeight, setHeaderHeight] = useState(0);

  const pageLinks = [
    {
      path: "/esi-ja-perusopetus",
      text: intl.formatMessage(educationMessages.preAndBasicEducation),
      isExact: false
    },
    {
      path: "/lukiokoulutus",
      text: intl.formatMessage(educationMessages.highSchoolEducation)
    },
    {
      path: "/jarjestajat",
      text: intl.formatMessage(educationMessages.vocationalEducation)
    },
    { path: "/vapaa-sivistystyo", text: "Vapaa sivistystyö" },
    { path: "/tilastot", text: intl.formatMessage(commonMessages.statistics) }
  ];

  if (sessionStorage.getItem("role") === ROLE_ESITTELIJA) {
    pageLinks.push({
      path: "/asiat",
      text: "Asiat"
    });
  }

  const fetchSetup = useMemo(() => {
    return user && user.oid
      ? [{ key: "organisaatio", dispatchFn: dispatch, urlEnding: user.oid }]
      : [];
  }, [dispatch, user]);

  const ytunnus = useMemo(() => {
    return R.path(["raw", "ytunnus"], fromBackend.organisaatio || {});
  }, [fromBackend.organisaatio]);

  const onHeaderResize = (width, height) => {
    setHeaderHeight(height);
  };

  /**
   * If user has authenticated save some of his/her information into
   * session storage.
   */
  useEffect(() => {
    if (user && user.username !== sessionStorage.getItem("username")) {
      sessionStorage.setItem("username", user.username);
      sessionStorage.setItem("oid", user.oid);
      const role = [
        ROLE_YLLAPITAJA,
        ROLE_ESITTELIJA,
        ROLE_KAYTTAJA,
        ROLE_NIMENKIRJOITTAJA,
        ROLE_KATSELIJA
      ].find(role => _.indexOf(user.roles, role) > -1);
      sessionStorage.setItem("role", role || "");
    }
  }, [user]);

  return (
    <React.Fragment>
      <FetchHandler
        fetchSetup={fetchSetup}
        ready={
          <Router history={history}>
            <div className="flex flex-col min-h-screen">
              <header className="fixed w-full z-50">
                <ButtonAppBar
                  ytunnus={ytunnus}
                  user={R.path(["kayttaja", "raw"], fromBackend)}
                  organisaatio={R.path(["organisaatio", "raw"], fromBackend)}
                  dispatch={dispatch}
                  pageLinks={pageLinks}
                />
                {breakpointTabletMin && (
                  <Navigation ytunnus={ytunnus} pageLinks={pageLinks} />
                )}
                <ReactResizeDetector handleHeight onResize={onHeaderResize} />
              </header>
              <main
                className="flex flex-1 flex-col justify-between"
                style={{ marginTop: headerHeight }}
              >
                <div className="flex flex-col flex-1 bg-white">
                  <div className="pb-16 pt-8 mx-auto w-11/12 lg:w-3/4">
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
                  <div className="flex-1 flex flex-col">
                    <Switch>
                      <Route exact path="/" component={Home} />
                      <Route path="/logout" component={Logout} />
                      <Route path="/kirjaudu" component={Login} />
                      <Route exact path="/tilastot" component={Tilastot} />
                      <Route path="/cas-auth" component={RequireCasAuth} />
                      <Route path="/cas-logout" component={DestroyCasAuth} />
                      <Route path="/cas-ready" component={CasAuthenticated} />
                      <Route
                        exact
                        path="/jarjestajat"
                        render={() => (
                          <JarjestajatProvider>
                            <Jarjestajat />
                          </JarjestajatProvider>
                        )}
                      />
                      <Route
                        exact
                        path="/lukiokoulutus"
                        component={Lukiokoulutus}
                      />
                      <Route
                        exact
                        path="/vapaa-sivistystyo"
                        component={VapaaSivistystyo}
                      />
                      <Route
                        exact
                        path="/esi-ja-perusopetus"
                        component={EsiJaPerusopetus}
                      />
                      <Route
                        path="/jarjestajat/:ytunnus"
                        render={props => (
                          <JarjestajaSwitch
                            history={props.history}
                            match={props.match}
                            organisaatio={R.prop(
                              "raw",
                              fromBackend.organisaatio
                            )}
                            user={user}
                          />
                        )}
                      />
                    </Switch>
                  </div>
                </div>
              </main>
              <footer>
                <Footer
                // props={props}
                />
                <ToastContainer />
              </footer>
            </div>
          </Router>
        }
        user={user}
      ></FetchHandler>
    </React.Fragment>
  );
};

App.propTypes = {
  user: PropTypes.object
};

export default injectIntl(App);
