import React, { useContext, useEffect, useState } from "react";
import { IntlProvider, addLocaleData } from "react-intl";
import fiLocaleData from "react-intl/locale-data/fi";
import svLocaleData from "react-intl/locale-data/sv";
import translations from "./i18n/locales";
import App from "./App";
import { AppContext } from "./context/appContext";

addLocaleData(fiLocaleData);
addLocaleData(svLocaleData);

const AppWrapper = () => {
  const { state } = useContext(AppContext);
  const [messages, setMessages] = useState(translations[state.locale]);

  useEffect(() => {
    setMessages(translations[state.locale]);
  }, [state]);

  return (
    <IntlProvider locale={state.locale} key={state.locale} messages={messages}>
      <App />
    </IntlProvider>
  );
};

export default AppWrapper;
