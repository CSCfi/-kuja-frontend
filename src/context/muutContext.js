import React, { useReducer } from "react";
import reducer from "../services/muut/reducer";

const initialState = {
  isFetching: false,
  fetched: false,
  hasErrored: false,
  data: []
};

const MuutContext = React.createContext(initialState);

const MuutProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MuutContext.Provider value={{ state, dispatch }}>
      {props.children}
    </MuutContext.Provider>
  );
};

export { MuutContext, MuutProvider };
