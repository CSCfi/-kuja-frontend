import React, { useContext, useMemo } from "react";
import { IntlProvider, addLocaleData } from "react-intl";
import fiLocaleData from "react-intl/locale-data/fi";
import svLocaleData from "react-intl/locale-data/sv";
import translations from "./i18n/locales";
import { AppContext } from "./context/appContext";
import { BackendContext } from "./context/backendContext";
import FetchHandler from "./FetchHandler";
import App from "./App";
import * as R from "ramda";

addLocaleData(fiLocaleData);
addLocaleData(svLocaleData);

/**
 * The first thing to get the application running is to fetch the authenticated user.
 * Authentication is not required in every part of the app so even if there isn't an
 * authenticated user the basic structures of the app is shown.
 */
const AppWrapper = () => {
  const { state } = useContext(AppContext);
  /**
   * The main purpose of the BackendContext is to include all the data that is fetched
   * from the backend.
   */
  const { state: fromBackend = {}, dispatch } = useContext(BackendContext);

  const messages = useMemo(() => {
    return translations[state.locale];
  }, [state]);

  /**
   * When data from backend is needed a fetchSetup object should be created.
   * This setup is passed on to the FetchHandler that uses BackendService
   * for running the defined XHR calls. See FetchHandler for more details.
   */
  const fetchSetup = useMemo(() => {
    return [
      {
        key: "kayttaja",
        dispatchFn: dispatch,
        options: { withCredentials: true }
      }
    ];
  }, [dispatch]);

  /**
   * appView is shown to a use even if the search of the authenticated user failes.
   * The routes which need the authentication are hidden depending on the situation.
   */
  const appView = useMemo(() => {
    // We might not have a user at this point.
    return <App user={R.prop("raw", fromBackend.kayttaja)} />;
  }, [fromBackend.kayttaja]);

  return (
    <IntlProvider locale={state.locale} key={state.locale} messages={messages}>
      <React.Fragment>
        <FetchHandler
          /**
           * FetchHandler handles the fetchSetup, uses BackendService and renders the
           * proper view component (like appView  in this case).
           **/
          fetchSetup={fetchSetup}
          ready={appView}
          // App view is shown even if the user hasn't authenticated.
          erroneous={appView}
        ></FetchHandler>
      </React.Fragment>
    </IntlProvider>
  );
};

export default AppWrapper;
