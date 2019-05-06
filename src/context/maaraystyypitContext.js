import React, { useReducer } from "react";
import reducer from "services/maaraystyypit/reducer";

const initialState = {
  isFetching: false,
  fetched: false,
  hasErrored: false,
  data: []
};

const MaaraystyypitContext = React.createContext(initialState);

const MaaraystyypitProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MaaraystyypitContext.Provider value={{ state, dispatch }}>
      {props.children}
    </MaaraystyypitContext.Provider>
  );
};

export { MaaraystyypitContext, MaaraystyypitProvider };
