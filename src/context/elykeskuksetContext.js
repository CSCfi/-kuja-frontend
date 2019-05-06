import React, { useReducer } from "react";
import reducer from "services/elykeskukset/reducer";

const initialState = {
  isFetching: false,
  fetched: false,
  hasErrored: false,
  data: []
}

const ElykeskuksetContext = React.createContext(initialState);

const ElykeskuksetProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ElykeskuksetContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ElykeskuksetContext.Provider>
  );
};

export { ElykeskuksetContext, ElykeskuksetProvider };
