import React, { useContext, useEffect, useMemo, useState } from "react";
import { Route, Router, Switch } from "react-router-dom";
import Login from "scenes/Login/Login";
import PropTypes from "prop-types";
import Logout from "scenes/Logout/Logout";
import Footer from "scenes/Footer/Footer";
import Jarjestajat from "./scenes/Jarjestajat/Jarjestajat";
import { COLORS } from "./modules/styles";
import Home from "scenes/Home";
import CasAuthenticated from "scenes/CasAuthenticated/CasAuthenticated";
import Tilastot from "./scenes/Tilastot/components/Tilastot";
import RequireCasAuth from "./scenes/Login/services/RequireCasAuth";
import DestroyCasAuth from "./scenes/Logout/services/DestroyCasAuth";
import Lukiokoulutus from "./scenes/Lukiokoulutus/components/Lukiokoulutus";
import { Breadcrumbs } from "react-breadcrumbs-dynamic";
import EsiJaPerusopetus from "./scenes/EsiJaPerusopetus/components/EsiJaPerusopetus";
import VapaaSivistystyo from "./scenes/VapaaSivistystyo/components/VapaaSivistystyo";
import { NavLink } from "react-dom";
import { createBrowserHistory } from "history";
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

/**
 * App component forms the basic structure of the application and its routing.
 *
 * @param {props} - Properties object.
 */
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

  /**
   * The fetch the organization we need to know the authenticated user.
   * If the user hasn't authenticated the setup will be empty and organization
   * is not fetched.
   */
  const fetchSetup = useMemo(() => {
    return user && user.oid
      ? [{ key: "organisaatio", dispatchFn: dispatch, urlEnding: user.oid }]
      : [];
  }, [dispatch, user]);

  /**
   * Here we listen on changes of fromBackend.organisaatio object. If the object
   * changes the code is run. It's good to note that ytunnus might be undefined.
   */
  const ytunnus = useMemo(() => {
    return R.path(["raw", "ytunnus"], fromBackend.organisaatio || {});
  }, [fromBackend.organisaatio]);

  const onHeaderResize = (width, height) => {
    setHeaderHeight(height);
  };

  /**
   * If user has authenticated save some of his/her information into the
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
        // The value of ready is rendered when all the backend calls are done successfully.
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
                style={{ marginTop: headerHeight }}>
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
                        component={Jarjestajat}
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
        user={user}></FetchHandler>
    </React.Fragment>
  );
};

App.propTypes = {
  user: PropTypes.object
};

export default injectIntl(App);
