import React, { Component } from 'react';
import { IntlProvider, addLocaleData } from "react-intl";
import fiLocaleData from "react-intl/locale-data/fi";
import svLocaleData from "react-intl/locale-data/sv";
import translations from "./i18n/locales"
import App from "./App";

addLocaleData(fiLocaleData);
addLocaleData(svLocaleData);

class AppWrapper extends Component {
  render() {
    // get locale from url
    const locale = window.location.search.replace("?locale=","") || "fi"
    const messages = translations[locale];
    console.info(locale, messages);
    return (
      <IntlProvider locale={locale} key={locale} messages={messages}>
        <App />
      </IntlProvider>
    );
  }
}

export default AppWrapper;