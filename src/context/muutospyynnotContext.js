import React, { useReducer } from "react";
import reducer from "../services/muutospyynnot/reducer";

const initialState = {
  isFetching: false,
  fetched: false,
  hasErrored: false,
  data: {}
};

const MuutospyynnotContext = React.createContext(initialState);

const MuutospyynnotProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MuutospyynnotContext.Provider value={{ state, dispatch }}>
      {props.children}
    </MuutospyynnotContext.Provider>
  );
};

export { MuutospyynnotContext, MuutospyynnotProvider };
