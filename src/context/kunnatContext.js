import React, { useReducer } from "react";
import reducer from "services/kunnat/reducer";

const initialState = {
  isFetching: false,
  fetched: false,
  hasErrored: false,
  data: []
};

const KunnatContext = React.createContext(initialState);

const KunnatProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <KunnatContext.Provider value={{ state, dispatch }}>
      {props.children}
    </KunnatContext.Provider>
  );
};

export { KunnatContext, KunnatProvider };
