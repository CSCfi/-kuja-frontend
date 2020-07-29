import React, { useContext, useMemo, useState, useCallback } from "react";
import { Route, Router, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import Footer from "scenes/Footer/Footer";
import { COLORS } from "./modules/styles";
import Home from "scenes/Home";
import Tilastot from "./scenes/Tilastot/components/Tilastot";
import Lukiokoulutus from "./scenes/Lukiokoulutus/components/Lukiokoulutus";
import { Breadcrumbs } from "react-breadcrumbs-dynamic";
import EsiJaPerusopetus from "./scenes/EsiJaPerusopetus/components/EsiJaPerusopetus";
import VapaaSivistystyo from "./scenes/VapaaSivistystyo/components/VapaaSivistystyo";
import { NavLink } from "react-dom";
import { createBrowserHistory } from "history";
import { useIntl } from "react-intl";
import commonMessages from "./i18n/definitions/common";
import educationMessages from "./i18n/definitions/education";
import langMessages from "./i18n/definitions/languages";
import { ToastContainer } from "react-toastify";
import Header from "okm-frontend-components/dist/components/02-organisms/Header";
import { setLocale } from "./services/app/actions";
import { AppContext } from "./context/appContext";
import Navigation from "okm-frontend-components/dist/components/02-organisms/Navigation";
import SideNavigation from "okm-frontend-components/dist/components/02-organisms/SideNavigation";
import Jarjestaja from "./scenes/VapaaSivistystyo/components/Jarjestaja";

const history = createBrowserHistory();



/**
 * App component forms the basic structure of the application and its routing.
 *
 * @param {props} - Properties object.
 */
const App = () => {
  const intl = useIntl();

  const [isSideMenuVisible, setSideMenuVisibility] = useState(false);

  const { state: appState, dispatch: appDispatch } = useContext(AppContext);

  const oivaURL = process.env.REACT_APP_OIVA_URL || "https://localhost:443";
  const logo = { text: "Oiva", path: oivaURL };

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
      url: oivaURL + "/jarjestajat",
      text: intl.formatMessage(educationMessages.vocationalEducation)
    },
    {
      path: "/vapaa-sivistystyo",
      text: intl.formatMessage(educationMessages.vstEducation)
    },
    { path: "/tilastot", text: intl.formatMessage(commonMessages.statistics) }
  ];

  const onLocaleChange = useCallback(
    (...props) => {
      setLocale(props[1])(appDispatch);
      if (props[1]) {
        sessionStorage.setItem("locale", props[1]);
      } else {
        sessionStorage.removeItem("locale");
      }
    },
    [appDispatch]
  );

  const onMenuClick = useCallback(
    () => setSideMenuVisibility(isVisible => !isVisible),
    []
  );

  const shortDescription = useMemo(() => {
    return {
      text: intl.formatMessage(commonMessages.siteShortDescription),
      path: "/"
    };
  }, [intl]);

  const getHeader = useCallback(
    template => {
      if ((appDispatch, appState.locale && intl)) {
        return (
          <Header
            inFinnish={intl.formatMessage(langMessages.inFinnish)}
            inSwedish={intl.formatMessage(langMessages.inSwedish)}
            locale={appState.locale}
            logo={logo}
            onLocaleChange={onLocaleChange}
            onMenuClick={onMenuClick}
            organisation={{ text: "" }}
            shortDescription={shortDescription}
            template={template}></Header>
        );
      }
      return null;
    },
    [
      appDispatch,
      appState.locale,
      intl,
      onLocaleChange,
      onMenuClick,
      shortDescription
    ]
  );

  return (
    <React.Fragment>
      <Router history={history}>
        <div className="flex flex-col min-h-screen">
          <div className="relative lg:fixed z-50 w-full">
            {getHeader()}

            <div className="hidden md:block">
              <Navigation links={pageLinks}></Navigation>
            </div>
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
                }}
              />
            </div>
          </SideNavigation>

          <main className="flex flex-1 flex-col justify-between mt-16 md:mt-0 lg:mt-32">
            <div className="flex flex-col flex-1 bg-white">
              <div className="pb-16 pt-8 mx-auto w-11/12 lg:w-3/4">
                <nav tabIndex="0" aria-label={intl.formatMessage(commonMessages.breadCrumbs)}>
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
                </nav>
              </div>
              <div className="flex-1 flex flex-col">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/tilastot" component={Tilastot} />
                  <Route
                    exact
                    path="/lukiokoulutus"
                    component={Lukiokoulutus}
                  />
                  <Route
                    exact
                    path="/vapaa-sivistystyo"
                    render={props => {
                      return <VapaaSivistystyo history={history} />;
                    }}
                  />
                  <Route
                    path="/lupa/:uuid"
                    render={props => {
                      return (
                        <Jarjestaja
                          history={history}
                          uuid={props.match.params.uuid}
                          match={props.match}
                        />
                      );
                    }}
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
            <Footer oivaURL={oivaURL} />
            <ToastContainer />
          </footer>
        </div>
      </Router>
    </React.Fragment>
  );
};

App.propTypes = {
  user: PropTypes.object
};

export default App;
