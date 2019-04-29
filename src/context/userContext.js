import React, { useReducer } from "react";
import reducer from "services/kayttajat/reducer";

const initialState = {
  id: 0,
  oppilaitos: {
    organisaatio: {
      ytunnus: null
    }
  },
  isFetching: false,
  fetched: false,
  hasErrored: false
};

const UserContext = React.createContext(initialState);

const UserProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
