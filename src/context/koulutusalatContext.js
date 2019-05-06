import React, { useReducer } from "react";
import reducer from "services/koulutusalat/reducer";

const initialState = {
  isFetching: false,
  fetched: false,
  hasErrored: false,
  data: []
};

const KoulutusalatContext = React.createContext(initialState);

const KoulutusalatProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <KoulutusalatContext.Provider value={{ state, dispatch }}>
      {props.children}
    </KoulutusalatContext.Provider>
  );
};

export { KoulutusalatContext, KoulutusalatProvider };
