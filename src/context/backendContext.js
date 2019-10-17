import React, { useReducer } from "react";
import reducer from "services/muutoshakemus/utils/reducer";

const initialState = {};

const BackendContext = React.createContext(initialState);

const BackendProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BackendContext.Provider value={{ state, dispatch }}>
      {props.children}
    </BackendContext.Provider>
  );
};

export { BackendContext, BackendProvider };
