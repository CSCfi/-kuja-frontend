import React, { useContext, useEffect, useMemo } from "react";
import { IntlProvider, addLocaleData } from "react-intl";
import fiLocaleData from "react-intl/locale-data/fi";
import svLocaleData from "react-intl/locale-data/sv";
import translations from "./i18n/locales";
import { AppContext } from "./context/appContext";
import { BackendContext } from "./context/backendContext";
import { abort, fetchFromBackend } from "./services/backendService";
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

   * Abort controller instances are used for cancelling the related
   * XHR calls later.
   */
  const abortControllers = useMemo(() => {
    return fetchFromBackend([
      {
        key: "kayttaja",
        dispatchFn: dispatch,
        options: { withCredentials: true }
      }
    ]);
  }, [dispatch]);

  /**
   * Ongoing XHR calls must be canceled. It's done here.
   */
  useEffect(() => {
    return () => {
      abort(abortControllers);
    };
  }, [abortControllers]);

  return (
    <IntlProvider locale={state.locale} key={state.locale} messages={messages}>
      <App user={R.path(["kayttaja", "raw"], fromBackend)} />
    </IntlProvider>
  );
};

export default AppWrapper;
