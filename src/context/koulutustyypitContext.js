import React, { useReducer } from "react";
import reducer from "services/koulutustyypit/reducer";

const initialState = {
  isFetching: false,
  fetched: false,
  hasErrored: false,
  data: []
};

const KoulutustyypitContext = React.createContext(initialState);

const KoulutustyypitProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <KoulutustyypitContext.Provider value={{ state, dispatch }}>
      {props.children}
    </KoulutustyypitContext.Provider>
  );
};

export { KoulutustyypitContext, KoulutustyypitProvider };
