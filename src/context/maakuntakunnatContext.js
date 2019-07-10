import React, { useReducer } from "react";
import reducer from "services/maakuntakunnat/reducer";

const initialState = {
  isFetching: false,
  fetched: false,
  hasErrored: false,
  data: []
};

const MaakuntakunnatContext = React.createContext(initialState);

const MaakuntakunnatProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MaakuntakunnatContext.Provider value={{ state, dispatch }}>
      {props.children}
    </MaakuntakunnatContext.Provider>
  );
};

export { MaakuntakunnatContext, MaakuntakunnatProvider };
