import React, { useReducer } from "react";
import reducer from "../services/luvat/reducer";

const initialState = {
  isFetching: false,
  fetched: false,
  hasErrored: false,
  data: {},
  kohteet: {}
};

const LuvatContext = React.createContext(initialState);

const LuvatProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <LuvatContext.Provider value={{ state, dispatch }}>
      {props.children}
    </LuvatContext.Provider>
  );
};

export { LuvatContext, LuvatProvider };
