import React, { useReducer } from "react";
import reducer from "../services/muutoshakemus/reducer";

const initialState = {
  tutkinnot: {
    changes: {}
  },
  koulutukset: {
    changes: {}
  },
  opetuskielet: {
    changes: {}
  },
  tutkintokielet: {
    changes: {}
  }
};

const MuutoshakemusContext = React.createContext(initialState);

const MuutoshakemusProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MuutoshakemusContext.Provider value={{ state, dispatch }}>
      {props.children}
    </MuutoshakemusContext.Provider>
  );
};

export { MuutoshakemusContext, MuutoshakemusProvider };
