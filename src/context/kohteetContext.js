import React, { useReducer } from "react";
import reducer from "services/kohteet/reducer";

const initialState = {
  isFetching: false,
  fetched: false,
  hasErrored: false,
  data: []
};

const KohteetContext = React.createContext(initialState);

const KohteetProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <KohteetContext.Provider value={{ state, dispatch }}>
      {props.children}
    </KohteetContext.Provider>
  );
};

export { KohteetContext, KohteetProvider };
