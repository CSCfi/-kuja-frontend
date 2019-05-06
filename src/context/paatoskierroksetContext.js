import React, { useReducer } from "react";
import reducer from "services/paatoskierrokset/reducer";

const initialState = {
  isFetching: false,
  fetched: false,
  hasErrored: false,
  data: []
}

const PaatoskierroksetContext = React.createContext(initialState);

const PaatoskierroksetProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PaatoskierroksetContext.Provider value={{ state, dispatch }}>
      {props.children}
    </PaatoskierroksetContext.Provider>
  );
};

export { PaatoskierroksetContext, PaatoskierroksetProvider };
