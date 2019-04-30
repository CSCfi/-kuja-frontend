import React, { useReducer } from "react";
import reducer from "../services/lupahistoria/reducer";

const initialState = {
  isFetching: false,
  fetched: false,
  hasErrored: false,
  data: {}
}

const LupahistoriaContext = React.createContext(initialState);

const LupahistoriaProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <LupahistoriaContext.Provider value={{ state, dispatch }}>
      {props.children}
    </LupahistoriaContext.Provider>
  );
};

export { LupahistoriaContext, LupahistoriaProvider };
