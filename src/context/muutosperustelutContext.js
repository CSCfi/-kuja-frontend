import React, { useReducer } from "react";
import reducer from "../services/muutosperustelut/reducer";

const initialState = {
    isFetching: false,
    fetched: false,
    hasErrored: false,
    data: []
  };

const MuutosperustelutContext = React.createContext(initialState);

const MuutosperustelutProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MuutosperustelutContext.Provider value={{ state, dispatch }}>
      {props.children}
    </MuutosperustelutContext.Provider>
  );
};

export { MuutosperustelutContext, MuutosperustelutProvider };
