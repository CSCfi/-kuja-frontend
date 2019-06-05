import React, { useReducer } from "react";
import reducer from "services/app/reducer";

const initialState = {
  locale: navigator.language.split("-")[0] || "fi"
}

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
