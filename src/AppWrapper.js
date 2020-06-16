import React, { useContext, useMemo, useEffect } from "react";
import { IntlProvider } from "react-intl";
import translations from "./i18n/locales";
import { AppContext } from "./context/appContext";
import { defaults } from "react-sweet-state";
import { loadProgressBar } from "axios-progress-bar";
import App from "./App";

import "axios-progress-bar/dist/nprogress.css";
import { useKaannokset } from "./stores/localizations";

defaults.devtools = true;

loadProgressBar();

if (!Intl.PluralRules) {
  require("@formatjs/intl-pluralrules/polyfill");
  require("@formatjs/intl-pluralrules/dist/locale-data/fi"); // Add locale data for fi
}

if (!Intl.RelativeTimeFormat) {
  require("@formatjs/intl-relativetimeformat/polyfill");
  require("@formatjs/intl-relativetimeformat/dist/locale-data/sv"); // Add locale data for sv
}

/**
 * The first thing to get the application running is to fetch the authenticated user.
 * Authentication is not required in every part of the app so even if there isn't an
 * authenticated user the basic structures of the app is shown.
 */
const AppWrapper = () => {
  const [kaannokset, kaannoksetActions] = useKaannokset();
  // See the file: .env.development.local
  const isBackendTheSourceOfLocalizations = !process.env.USE_LOCAL_TRANSLATIONS;
  const { state } = useContext(AppContext);

  useEffect(() => {
    if (isBackendTheSourceOfLocalizations) {
      const abortController = kaannoksetActions.load();
      return function cancel() {
        if (abortController) {
          abortController.abort();
        }
      };
    }
  }, [isBackendTheSourceOfLocalizations, kaannoksetActions]);

  const messages = useMemo(() => {
    if (!!kaannokset.data) {
      //Using backend data as source
      return kaannokset.data;
    } else if (!isBackendTheSourceOfLocalizations) {
      //Using local files as source
      return translations;
    } else {
      //Falling back to default localization messages
      return {};
    }
  }, [kaannokset.fetchedAt, isBackendTheSourceOfLocalizations]);

  if(!kaannokset.fetchedAt && !kaannokset.isErroneous && isBackendTheSourceOfLocalizations) {
    return <React.Fragment />
  }

  else {
    return (
      <IntlProvider locale={state.locale} key={state.locale} messages={messages[state.locale]}>
        <App/>
      </IntlProvider>
    );
  }
};

export default AppWrapper;
