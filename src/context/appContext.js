import React, { useReducer } from "react";
import reducer from "services/app/reducer";
import { languages } from "../i18n/supportedLanguages";
import * as R from "ramda";

const tmpLocale = navigator.language.split("-")[0];

const initialState = {
  locale: R.contains(tmpLocale, languages) ? tmpLocale : "fi"
};

const AppContext = React.createContext(initialState);

const AppProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
