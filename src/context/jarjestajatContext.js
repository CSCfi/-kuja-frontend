import React, { useReducer } from "react";
import reducer from "../services/jarjestajat/reducer";

const initialState = {
  isFetching: false,
  fetched: false,
  hasErrored: false,
  data: {}
};

const JarjestajatContext = React.createContext(initialState);

const JarjestajatProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <JarjestajatContext.Provider value={{ state, dispatch }}>
      {props.children}
    </JarjestajatContext.Provider>
  );
};

export { JarjestajatContext, JarjestajatProvider };
