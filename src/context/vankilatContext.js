import React, { useReducer } from "react";
import reducer from "../services/vankilat/reducer";

const initialState = {
    isFetching: false,
    fetched: false,
    hasErrored: false,
    data: []
  };

const VankilatContext = React.createContext(initialState);

const VankilatProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <VankilatContext.Provider value={{ state, dispatch }}>
      {props.children}
    </VankilatContext.Provider>
  );
};

export { VankilatContext, VankilatProvider };
