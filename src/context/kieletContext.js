import React, { useReducer } from "react";
import reducer from "services/kielet/reducer";

const initialState = {
  isFetching: false,
  fetched: false,
  hasErrored: false,
  opetuskielet: [],
  kielet: []
};

const KieletContext = React.createContext(initialState);

const KieletProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <KieletContext.Provider value={{ state, dispatch }}>
      {props.children}
    </KieletContext.Provider>
  );
};

export { KieletContext, KieletProvider };
