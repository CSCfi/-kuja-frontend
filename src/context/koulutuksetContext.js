import React, { useReducer } from "react";
import reducer from "services/koulutukset/reducer";

const initialState = {
  isFetching: false,
  fetched: false,
  hasErrored: false,
  data: {},
  muut: {
    isFetching: false,
    fetched: [],
    hasErrored: false,
    muudata: {}
  },
  poikkeukset: {
    isFetching: false,
    fetched: [],
    hasErrored: false,
    data: []
  }
};

const KoulutuksetContext = React.createContext(initialState);

const KoulutuksetProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <KoulutuksetContext.Provider value={{ state, dispatch }}>
      {props.children}
    </KoulutuksetContext.Provider>
  );
};

export { KoulutuksetContext, KoulutuksetProvider };
