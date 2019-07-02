import React, { useReducer } from "react";
import reducer from "../services/opiskelijavuodet/reducer";

const initialState = {
  isFetching: false,
  fetched: false,
  hasErrored: false,
  data: []
};

const OpiskelijavuodetContext = React.createContext(initialState);

const OpiskelijavuodetProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <OpiskelijavuodetContext.Provider value={{ state, dispatch }}>
      {props.children}
    </OpiskelijavuodetContext.Provider>
  );
};

export { OpiskelijavuodetContext, OpiskelijavuodetProvider };