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

const AppWrapper = () => {
  const { state } = useContext(AppContext);
  const { state: fromBackend = {}, dispatch } = useContext(BackendContext);

  const messages = useMemo(() => {
    return translations[state.locale];
  }, [state]);

  /**
   * This setup is passed on to the FetchHandler that uses BackendService
   * for running the defined XHR calls.
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

  const appView = useMemo(() => {
    return <App user={R.prop("raw", fromBackend.kayttaja)} />;
  }, [fromBackend.kayttaja]);

  return (
    <IntlProvider locale={state.locale} key={state.locale} messages={messages}>
      <React.Fragment>
        <FetchHandler
          fetchSetup={fetchSetup}
          ready={appView}
          // App view is shown even if there isn't logged in user.
          erroneous={appView}
        ></FetchHandler>
      </React.Fragment>
    </IntlProvider>
  );
};

export default AppWrapper;
