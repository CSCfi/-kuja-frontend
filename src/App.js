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
import JarjestajaSwitch from "./scenes/Jarjestajat/Jarjestaja/components/JarjestajaSwitch";
import { NavLink } from "react-dom";
import { createBrowserHistory } from "history";
import { BackendContext } from "./context/backendContext";
import authMessages from "./i18n/definitions/auth";
import { MEDIA_QUERIES } from "./modules/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { loadProgressBar } from "axios-progress-bar";
import { injectIntl } from "react-intl";
import commonMessages from "./i18n/definitions/common";
import educationMessages from "./i18n/definitions/education";
import langMessages from "./i18n/definitions/languages";
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
import Header from "./components/02-organisms/Header";
import { setLocale } from "./services/app/actions";
import { AppContext } from "./context/appContext";
import Navigation from "./components/02-organisms/Navigation";
import SideNavigation from "./components/02-organisms/SideNavigation";

loadProgressBar();

const history = createBrowserHistory();

/**
 * App component forms the basic structure of the application and its routing.
 *
 * @param {props} - Properties object.
 */
const App = ({ intl, user }) => {
  const [isSideMenuVisible, setSideMenuVisibility] = useState(false);

  const { state: fromBackend = {}, dispatch } = useContext(BackendContext);
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);

  const breakpointTabletMin = useMediaQuery(MEDIA_QUERIES.TABLET_MIN);

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

  const getHeader = template => (
    <Header
      inFinnish={intl.formatMessage(langMessages.inFinnish)}
      inSwedish={intl.formatMessage(langMessages.inSwedish)}
      isAuthenticated={!!user}
      locale={appState.locale}
      logIn={intl.formatMessage(authMessages.logIn)}
      logo={{ text: "Oiva", path: "/" }}
      authenticationLink={{
        text: !user
          ? [intl.formatMessage(authMessages.logIn)]
          : [intl.formatMessage(authMessages.logOut), user.username],
        path: !user ? "/cas-auth" : "/cas-logout"
      }}
      onLocaleChange={(...props) => {
        setLocale(props[1])(appDispatch);
        if (props[1]) {
          sessionStorage.setItem("locale", props[1]);
        } else {
          sessionStorage.removeItem("locale");
        }
      }}
      onLoginButtonClick={() => history.push("/cas-auth")}
      onMenuClick={() => {
        return setSideMenuVisibility(isVisible => !isVisible);
      }}
      organisation={{
        text: R.path(
          ["nimi", intl.locale],
          R.path(["organisaatio", "raw"], fromBackend)
        ),
        path: "/"
      }}
      shortDescription={{
        text: intl.formatMessage(commonMessages.siteShortDescription),
        path: "/"
      }}
      template={template}></Header>
  );

  return (
    <React.Fragment>
      <FetchHandler
        fetchSetup={fetchSetup}
        // The value of ready is rendered when all the backend calls are done successfully.
        ready={
          <Router history={history}>
            <div className="flex flex-col min-h-screen">
              {getHeader()}

              <div className="hidden md:block">
                <Navigation links={pageLinks}></Navigation>
              </div>

              <SideNavigation
                isVisible={isSideMenuVisible}
                handleDrawerToggle={isVisible => {
                  setSideMenuVisibility(isVisible);
                }}>
                {getHeader("C")}

                <div className="p-4 max-w-xl">
                  <Navigation
                    direction="vertical"
                    links={pageLinks}
                    theme={{
                      backgroundColor: "white",
                      color: "black",
                      hoverColor: "white"
                    }}></Navigation>
                </div>
              </SideNavigation>

              <main className="flex flex-1 flex-col justify-between">
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
                        render={props => (
                          <Jarjestajat history={props.history} />
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
        user={user}></FetchHandler>
    </React.Fragment>
  );
};

App.propTypes = {
  user: PropTypes.object
};

export default injectIntl(App);
