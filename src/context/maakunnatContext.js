import React, { useReducer } from "react";
import reducer from "services/maakunnat/reducer";

const initialState = {
  isFetching: false,
  fetched: false,
  hasErrored: false,
  data: []
};

const MaakunnatContext = React.createContext(initialState);

const MaakunnatProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MaakunnatContext.Provider value={{ state, dispatch }}>
      {props.children}
    </MaakunnatContext.Provider>
  );
};

export { MaakunnatContext, MaakunnatProvider };
