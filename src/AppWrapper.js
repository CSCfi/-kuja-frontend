import React, { useContext, useEffect, useMemo } from "react";
import { IntlProvider, addLocaleData } from "react-intl";
import fiLocaleData from "react-intl/locale-data/fi";
import svLocaleData from "react-intl/locale-data/sv";
import translations from "./i18n/locales";
import { AppContext } from "./context/appContext";
import { BackendContext } from "./context/backendContext";
import {
  abort,
  fetchFromBackend,
  statusMap,
  getFetchState
} from "./services/backendService";
import App from "./App";
import { MessageWrapper } from "./modules/elements";
import Loading from "./modules/Loading";

addLocaleData(fiLocaleData);
addLocaleData(svLocaleData);

const AppWrapper = () => {
  const { state } = useContext(AppContext);
  const { state: fromBackend = {}, dispatch } = useContext(BackendContext);

  const messages = useMemo(() => {
    return translations[state.locale];
  }, [state]);

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
   * Abort controller instances are used for cancelling the related
   * XHR calls later.
   */
  const abortControllers = useMemo(() => {
    return fetchFromBackend(fetchSetup);
  }, [fetchSetup]);

  const fetchState = useMemo(() => {
    return getFetchState(fetchSetup, fromBackend);
  }, [fetchSetup, fromBackend]);

  /**
   * Ongoing XHR calls must be canceled. It's done here.
   */
  useEffect(() => {
    return () => {
      abort(abortControllers);
    };
  }, [abortControllers]);

  const view = useMemo(() => {
    let jsx = <React.Fragment></React.Fragment>;
    if (
      fetchState.conclusion === statusMap.ready ||
      fetchState.conclusion === statusMap.erroneous
    ) {
      jsx = <App user={fromBackend.kayttaja.raw} />;
    } else if (fetchState.conclusion === statusMap.fetching) {
      jsx = (
        <MessageWrapper>
          <Loading
            notReadyList={fetchState.notReadyList}
            percentage={fetchState.percentage.ready}
          />
        </MessageWrapper>
      );
    }
    return jsx;
  }, [
    fetchState.conclusion,
    fetchState.notReadyList,
    fetchState.percentage.ready,
    fromBackend.kayttaja
  ]);

  return (
    <IntlProvider locale={state.locale} key={state.locale} messages={messages}>
      {view}
    </IntlProvider>
  );
};

export default AppWrapper;
